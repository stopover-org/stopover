# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::EventsRelated::UnpublishEvent, type: :mutation do
  let(:mutation) do
    "
      mutation UnpublishEvent($input: UnpublishEventInput!) {
        unpublishEvent(input: $input) {
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
  let!(:event) { create(:recurring_not_published_event) }
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
      expect(event.schedules.count).to eq(56)
      expect(ClearSchedulesJob).to receive(:perform_later).with(event_id: event.id)
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expect(result.dig(:data, :unpublishEvent, :event, :id)).to eq(GraphqlSchema.id_from_object(event))
      expect(result.dig(:data, :unpublishEvent, :event, :status)).to eq('unpublished')
      expect(result.dig(:data, :unpublishEvent, :notification)).to eq('Event unpublished!')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expect(result.dig(:data, :unpublishEvent, :event)).to be_nil
      expect(result.dig(:data, :unpublishEvent, :errors)).to include(error)
    end
  end

  context 'unpublish event' do
    before do
      event.firm.update(status: 'active')
    end
    context 'as manager' do
      context 'for published event' do
        before { event.update(status: 'published') }
        include_examples :successful
      end
    end

    context 'permissions' do
      context 'for removed fir' do
        before { event.firm.update(status: 'removed') }
        include_examples :fail, 'You are not authorized'
      end

      context 'for removed event' do
        before { event.update(status: 'removed') }
        include_examples :fail, 'Event is removed already'
      end

      context 'for draft event' do
        before { event.update(status: 'draft') }
        include_examples :fail, 'Event wasn\'t verified yet'
      end

      context 'for unpublished event' do
        before { event.update(status: 'unpublished') }
        include_examples :fail, 'Event wasn\'t published yet'
      end

      context 'as common user' do
        let(:current_user) { create(:active_user) }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end