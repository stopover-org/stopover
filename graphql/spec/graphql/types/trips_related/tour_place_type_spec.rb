# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::TripsRelated::TourPlaceType, type: :graphql_type do
  let(:variables) { { eventId: GraphqlSchema.id_from_object(event) } }
  let(:current_user) { create(:active_user, with_account: true) }
  let(:event) { create(:recurring_event, status: :published) }
  subject do
    GraphqlSchema.execute(query,
                          variables: variables,
                          context: { current_user: current_user }).to_h.deep_symbolize_keys
  end

  context 'available fields' do
    let(:query) do
      <<-GRAPHQL
        query {
          __type(name:"TourPlace") {
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
                                                            name: 'description'
                                                          },
                                                          {
                                                            name: 'durationTime'
                                                          },
                                                          {
                                                            name: 'id'
                                                          },
                                                          {
                                                            name: 'image'
                                                          },
                                                          {
                                                            name: 'title'
                                                          }
                                                        ])
    end
  end
end
