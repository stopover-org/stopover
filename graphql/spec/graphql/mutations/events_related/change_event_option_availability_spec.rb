# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::EventsRelated::ChangeEventOptionAvailability, type: :mutation do
  let(:mutation) do
    "
      mutation ChangeEventOptionAvailability($input: ChangeEventOptionAvailabilityInput!) {
        changeEventOptionAvailability(input: $input) {
          eventOption {
            id
            status
          }

          errors
          notification
        }
      }
    "
  end
  let!(:event_option) { create(:event_option) }
  let(:current_user) { event_option.event.firm.accounts.last.user }

  let(:input) do
    { eventOptionId: GraphqlSchema.id_from_object(event_option) }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do |status, message|
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { EventOption.count }.by(0)

      expect(result.dig(:data, :changeEventOptionAvailability, :eventOption, :id)).to eq(GraphqlSchema.id_from_object(event_option))
      expect(result.dig(:data, :changeEventOptionAvailability, :eventOption, :status)).to eq(status)
      expect(result.dig(:data, :changeEventOptionAvailability, :notification)).to eq(message)
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { EventOption.count }.by(0)

      expect(result.dig(:data, :changeEventOptionAvailability, :eventOption)).to be_nil
      expect(result.dig(:data, :changeEventOptionAvailability, :errors)).to include(error)
    end
  end

  context 'change event option availability' do
    context 'as manager' do
      context 'from available to not available' do
        before { event_option.update(status: 'available') }
        include_examples :successful, 'not_available', 'Event Option is not available!'
      end

      context 'from not available to available' do
        before { event_option.update(status: 'not_available') }
        include_examples :successful, 'available', 'Event Option is available!'
      end
    end

    context 'permissions' do
      context 'for removed event' do
        before { event_option.event.update(status: 'removed') }
        include_examples :fail, 'Event removed'
      end

      context 'as common user' do
        let(:current_user) { create(:active_user) }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
