# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::FirmsRelated::FirmType, type: :graphql_type do
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
          __type(name:"Firm") {
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
                                                            name: 'accounts'
                                                          },
                                                          {
                                                            name: 'address'
                                                          },
                                                          {
                                                            name: 'addresses'
                                                          },
                                                          {
                                                            name: 'balance'
                                                          },
                                                          {
                                                            name: 'booking'
                                                          },
                                                          {
                                                            name: 'bookings'
                                                          },
                                                          {
                                                            name: 'contactPerson'
                                                          },
                                                          {
                                                            name: 'contacts'
                                                          },
                                                          {
                                                            name: 'contractAddress'
                                                          },
                                                          {
                                                            name: 'description'
                                                          },
                                                          {
                                                            name: 'event'
                                                          },
                                                          {
                                                            name: 'events'
                                                          },
                                                          {
                                                            name: 'eventsAutocomplete'
                                                          },
                                                          {
                                                            name: 'id'
                                                          },
                                                          {
                                                            name: 'image'
                                                          },
                                                          {
                                                            name: 'margin'
                                                          },
                                                          {
                                                            name: 'payment'
                                                          },
                                                          {
                                                            name: 'paymentTypes'
                                                          },
                                                          {
                                                            name: 'payments'
                                                          },
                                                          {
                                                            name: 'primaryEmail'
                                                          },
                                                          {
                                                            name: 'primaryPhone'
                                                          },
                                                          {
                                                            name: 'schedule'
                                                          },
                                                          {
                                                            name: 'schedules'
                                                          },
                                                          {
                                                            name: 'status'
                                                          },
                                                          {
                                                            name: 'stripeConnects'
                                                          },
                                                          {
                                                            name: 'title'
                                                          },
                                                          {
                                                            name: 'website'
                                                          }
                                                        ])
    end
  end
end
