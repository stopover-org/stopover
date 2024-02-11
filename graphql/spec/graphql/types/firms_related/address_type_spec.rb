# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::FirmsRelated::AddressType, type: :graphql_type do
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
          __type(name:"Address") {
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
                                                            name: 'country'
                                                          },
                                                          {
                                                            name: 'fullAddress'
                                                          },
                                                          {
                                                            name: 'houseNumber'
                                                          },
                                                          {
                                                            name: 'id'
                                                          },
                                                          {
                                                            name: 'latitude'
                                                          },
                                                          {
                                                            name: 'longitude'
                                                          },
                                                          {
                                                            name: 'region'
                                                          },
                                                          {
                                                            name: 'street'
                                                          }
                                                        ])
    end
  end
end
