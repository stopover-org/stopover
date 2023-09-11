# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::EventsRelated::PublishEvent, type: :mutation do
  let(:mutation) do
    "
      mutation PublishEvent($input: PublishEventInput!) {
        publishEvent(input: $input) {
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
  let!(:event) { create(:recurring_not_published_event, status: 'unpublished', skip_schedules: true) }
  let(:current_user) { event.firm.accounts.last.user }

  let(:input) do
    { eventId: GraphqlSchema.id_from_object(event) }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do
    it 'successful' do
      result = nil
      expect(event.schedules.count).to eq(0)
      expect(ScheduleEventJob).to receive(:perform_later).with(event_id: event.id)
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expect(result.dig(:data, :publishEvent, :event, :id)).to eq(GraphqlSchema.id_from_object(event))
      expect(result.dig(:data, :publishEvent, :event, :status)).to eq('published')
      expect(result.dig(:data, :publishEvent, :notification)).to eq('Event published!')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expect(result.dig(:data, :publishEvent, :event)).to be_nil
      expect(result.dig(:data, :publishEvent, :errors)).to include(error)
    end
  end

  context 'change event option availability' do
    before { event.firm.update(status: 'active') }
    context 'as manager' do
      include_examples :successful
    end

    context 'permissions' do
      context 'for already published event' do
        before { event.update(status: 'published') }
        include_examples :fail, 'Event published already'
      end

      context 'for draft firm' do
        before { event.firm.update(status: 'pending') }
        include_examples :fail, 'Firm is not verified'
      end

      context 'for draft event' do
        before { event.update(status: 'draft') }
        include_examples :fail, 'Event is not verified'
      end

      context 'for removed event' do
        before { event.update(status: 'removed') }
        include_examples :fail, 'Event removed'
      end

      context 'as common user' do
        let(:current_user) { create(:active_user) }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
