# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::EventsRelated::EventOptionType, type: :graphql_type do
  let(:variables) { {} }
  let(:current_user) { create(:active_user) }
  subject do
    GraphqlSchema.execute(query,
                          variables: variables,
                          context: { current_user: current_user }).to_h.deep_symbolize_keys
  end

  context 'available fields' do
    let(:query) do
      <<-GRAPHQL
        query {
          __type(name:"EventOption") {
            fields {
              name
            }
          }
        }
      GRAPHQL
    end

    it 'success' do
      result = subject
      expect(result.dig(:data, :__type, :fields)).to eq([
                                                          {
                                                            name: 'attendeePrice'
                                                          },
                                                          {
                                                            name: 'builtIn'
                                                          },
                                                          {
                                                            name: 'description'
                                                          },
                                                          {
                                                            name: 'event'
                                                          },
                                                          {
                                                            name: 'forAttendee'
                                                          },
                                                          {
                                                            name: 'id'
                                                          },
                                                          {
                                                            name: 'organizerPrice'
                                                          },
                                                          {
                                                            name: 'status'
                                                          },
                                                          {
                                                            name: 'title'
                                                          }
                                                        ])
    end
  end

  context 'translate' do
    let(:event_option) { create(:event_option) }
    let(:variables) { { eventId: GraphqlSchema.id_from_object(event_option.event) } }
    let(:query) do
      <<-GRAPHQL
        query($eventId: ID!) {
          event(id: $eventId) {
            eventOptions {
              title
              description
            }
          }
        }
      GRAPHQL
    end

    before do
      event_option.event.update_columns(status: :published)
    end

    context 'firm scope' do
      let(:firm) { create(:firm) }
      let(:event) { create(:recurring_event, firm: firm) }
      let(:event_option) { create(:event_option, event: event) }
      let(:current_user) { firm.accounts.last.user }

      it 'title' do
        result = subject

        expect(result.dig(:data, :event, :eventOptions, 0, :title)).to eq(event_option.title)
      end

      it 'description' do
        result = subject

        expect(result.dig(:data, :event, :eventOptions, 0, :description)).to eq(event_option.description)
      end
    end

    context 'without firm scope' do
      let(:current_user) { create(:active_user, with_account: true) }

      it 'title and description' do
        expect_any_instance_of(EventOption).to receive(:translate).with(:title)
                                                                  .and_return('Translated title')
        expect_any_instance_of(EventOption).to receive(:translate).with(:description)
                                                                  .and_return('Translated description')
        result = subject

        expect(result.dig(:data, :event, :eventOptions, 0, :title)).to eq('Translated title')
        expect(result.dig(:data, :event, :eventOptions, 0, :description)).to eq('Translated description')
      end
    end
  end
end
