# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::EventsRelated::VerifyEvent, type: :mutation do
  let(:mutation) do
    "
      mutation VerifyEvent($input: VerifyEventInput!) {
        verifyEvent(input: $input) {
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
  let!(:event) { create(:event) }
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
    it 'send notification to firm owner' do
      expect { subject }.to change { Notification.where(to: event.firm.primary_email).count }.by(1)
    end

    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expect(result.dig(:data, :verifyEvent, :event, :id)).to eq(GraphqlSchema.id_from_object(event))
      expect(result.dig(:data, :verifyEvent, :event, :status)).to eq('unpublished')
      expect(result.dig(:data, :verifyEvent, :notification)).to eq('Event verified')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expect(result.dig(:data, :verifyEvent, :event)).to be_nil
      expect(result.dig(:data, :verifyEvent, :errors)).to include(error)
    end
  end

  context 'verify event' do
    before do
      event.firm.update(status: 'active')
      current_user.update(service_user: true)
      event.update(status: 'draft')
    end

    context 'as service_user' do
      context 'for draft event' do
        include_examples :successful
      end
    end

    context 'permissions' do
      context 'for removed firm' do
        before { event.firm.update(status: 'removed') }
        include_examples :fail, 'You are not authorized'
      end

      context 'for removed event' do
        before { event.update(status: 'removed') }
        include_examples :fail, 'Event removed'
      end

      context 'for published event' do
        before { event.update(status: 'published') }
        include_examples :fail, 'Something went wrong'
      end

      context 'for unpublished event' do
        before { event.update(status: 'unpublished') }
        include_examples :fail, 'Something went wrong'
      end

      context 'as manager' do
        before { current_user.update(service_user: false) }
        include_examples :fail, 'You are not authorized'
      end

      context 'as common user' do
        let(:current_user) { create(:active_user) }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
