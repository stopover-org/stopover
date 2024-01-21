# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::EventsRelated::RescheduleEvent, type: :mutation do
  let(:mutation) do
    "
      mutation RescheduleEvent($input: RescheduleEventInput!) {
        rescheduleEvent(input: $input) {
          event {
            id
            status
          }

          errors
          notification
        }
      }
    "
  end
  let(:event) { create(:recurring_not_published_event) }
  let(:current_user) { event.firm.accounts.last.user }

  let(:input) do
    { eventId: GraphqlSchema.id_from_object(event.reload) }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: { input: input },
                          context: { current_user: current_user })
  end

  shared_examples :successful do |status|
    it 'successful' do
      result = nil
      expect(event.schedules.count).to eq(56)
      expect(ScheduleEventJob).to receive(:perform_later).with(event_id: event.id)
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expect(result.dig(:data, :rescheduleEvent, :event, :id)).to eq(GraphqlSchema.id_from_object(event))
      expect(result.dig(:data, :rescheduleEvent, :event, :status)).to eq(status)
      expect(result.dig(:data, :rescheduleEvent, :notification)).to eq('Event rescheduled')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expect(result.dig(:data, :rescheduleEvent, :event)).to be_nil
      expect(result.dig(:data, :rescheduleEvent, :errors)).to include(error)
    end
  end

  context 'change event option availability' do
    before { event.firm.update!(status: 'active') }
    context 'as manager' do
      context 'for published event' do
        before { event.update!(status: 'published') }
        include_examples :successful, 'published'
      end
      context 'for unpublished event' do
        before { event.update!(status: 'unpublished') }
        include_examples :successful, 'unpublished'
      end
    end

    context 'permissions' do
      context 'for removed event' do
        before { event.update!(status: 'removed') }
        include_examples :fail, 'Event removed'
      end

      context 'for draft event' do
        before { event.update!(status: 'draft') }
        include_examples :fail, 'Event was not verified'
      end

      context 'as common user' do
        let(:current_user) { create(:active_user) }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
