# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::EventsRelated::EventFiltersType, type: :graphql_type do
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
          __type(name:"EventFilters") {
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
                                                            name: 'city'
                                                          },
                                                          {
                                                            name: 'endDate'
                                                          },
                                                          {
                                                            name: 'maxPrice'
                                                          },
                                                          {
                                                            name: 'minPrice'
                                                          },
                                                          {
                                                            name: 'startDate'
                                                          }
                                                        ])
    end
  end
end
