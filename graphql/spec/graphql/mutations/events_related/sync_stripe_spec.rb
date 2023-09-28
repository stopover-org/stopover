# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::EventsRelated::SyncStripe, type: :mutation do
  let(:mutation) do
    "
      mutation SyncStripe($input: SyncStripeInput!) {
        syncStripe(input: $input) {
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

  shared_examples :successful do |status, with_opts|
    it 'successful' do
      result = nil
      expect(event.schedules.count).to eq(56)
      expect(Stopover::StripeIntegrator).to receive(:sync).with(event)
      if with_opts
        event.event_options.each do |opt|
          expect(Stopover::StripeIntegrator).to receive(:sync).with(opt)
        end
      end
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expect(result.dig(:data, :syncStripe, :event, :id)).to eq(GraphqlSchema.id_from_object(event))
      expect(result.dig(:data, :syncStripe, :event, :status)).to eq(status)
      expect(result.dig(:data, :syncStripe, :notification)).to eq('Sync in progress')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expect(result.dig(:data, :syncStripe, :event)).to be_nil
      expect(result.dig(:data, :syncStripe, :errors)).to include(error)
    end
  end

  context 'sync stripe' do
    before do
      event.firm.update(status: 'active', payment_types: ['stripe'])
    end
    context 'as manager' do
      context 'with event options' do
        let!(:event_options) { create_list(:event_option, 4, event: event, attendee_price_cents: 100) }
        context 'for published event' do
          before { event.update(status: 'published') }
          include_examples :successful, 'published', true
        end
        context 'for unpublished event' do
          before { event.update(status: 'unpublished') }
          include_examples :successful, 'unpublished', true
        end
      end
      context 'without event options' do
        context 'for published event' do
          before { event.update(status: 'published') }
          include_examples :successful, 'published'
        end
        context 'for unpublished event' do
          before { event.update(status: 'unpublished') }
          include_examples :successful, 'unpublished'
        end
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

      context 'for draft event' do
        before { event.update(status: 'draft') }
        include_examples :fail, 'Event was not verified'
      end

      context 'as common user' do
        let(:current_user) { create(:active_user) }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
