# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::EventsRelated::StripeIntegrationType, type: :graphql_type do
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
          __type(name:"StripeIntegration") {
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
                                                            name: 'id'
                                                          },
                                                          {
                                                            name: 'priceId'
                                                          },
                                                          {
                                                            name: 'productId'
                                                          },
                                                          {
                                                            name: 'status'
                                                          },
                                                          {
                                                            name: 'stripeableId'
                                                          },
                                                          {
                                                            name: 'stripeableType'
                                                          },
                                                          {
                                                            name: 'version'
                                                          }
                                                        ])
    end
  end
end
