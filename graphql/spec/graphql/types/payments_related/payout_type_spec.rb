# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::PaymentsRelated::PayoutType, type: :graphql_type do
  let(:variables) { {} }
  let(:current_user) { create(:active_user, with_account: true) }
  subject do
    GraphqlSchema.execute(query,
                          variables: variables,
                          context: { current_user: current_user }).to_h.deep_symbolize_keys
  end

  context 'available fields' do
    let(:query) do
      <<-GRAPHQL
        query {
          __type(name:"Payout") {
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
                                                            name: 'createdAt'
                                                          },
                                                          {
                                                            name: 'id'
                                                          },
                                                          {
                                                            name: 'status'
                                                          },
                                                          {
                                                            name: 'totalAmount'
                                                          },
                                                          {
                                                            name: 'updatedAt'
                                                          }
                                                        ])
    end
  end
end
