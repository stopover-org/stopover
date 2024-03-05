# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::FirmsRelated::FirmType, type: :graphql_type do
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
                                                            name: 'availablePaymentMethods'
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
                                                            name: 'firmType'
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

  context 'sensitive fields' do
    let(:firm) { create(:firm, status: 'active') }
    let(:event) { create(:recurring_event) }
    let(:schedule) { event.schedules.last }
    let(:booking) { create(:booking, event: event, schedule: event.schedules.last) }
    let(:payment) { create(:payment, firm: firm, booking: booking) }
    let(:variables) do
      {
        paymentId: GraphqlSchema.id_from_object(payment),
        bookingId: GraphqlSchema.id_from_object(booking),
        scheduleId: GraphqlSchema.id_from_object(schedule),
        eventId: GraphqlSchema.id_from_object(event),
        firmId: GraphqlSchema.id_from_object(firm)
      }
    end
    let(:query) do
      <<-GRAPHQL
        query($firmId: ID!, $paymentId: ID!, $bookingId: ID!, $eventId: ID!, $scheduleId: ID!) {
          firm(id: $firmId) {
            id
            contactPerson
            contacts
            description
            primaryEmail
            primaryPhone
            status
            title
            website
            image
            paymentTypes
            availablePaymentMethods
            address {
              id
            }
            contractAddress
            balance {
              id
            }
            payments {
              edges {
                node {
                  id
                }
              }
            }
            payment(id: $paymentId) {
              id
            }
            bookings {
              edges {
                node {
                  id
                }
              }
            }
            booking(id: $bookingId) {
              id
            }
            schedules {
              edges {
                node {
                  id
                }
              }
            }
            schedule(id: $scheduleId) {
              id
            }
            events {
              edges {
                node {
                  id
                }
              }
            }
            event(id: $eventId) {
              id
            }
            stripeConnects {
              id
            }
            margin
            accounts {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      GRAPHQL
    end

    context 'for not authorized user' do
      it 'success' do
        Event.reindex_test
        result = subject

        expect(result.dig(:data, :firm)).not_to be_nil

        FirmPolicy::MANAGER_PROTECTED_FIELDS.each do |field|
          expect(result.dig(:data, :firm, field.to_s.camelize(:lower).to_sym)).to be_nil
        end
      end
    end

    context 'for authorized user' do
      let(:current_user) { firm.accounts.last.user }

      it 'success' do
        result = subject

        FirmPolicy::MANAGER_PROTECTED_FIELDS.each do |field|
          expect(result.dig(:data, :firm, field.to_s.camelize(:lower).to_sym)).not_to be_nil
        end
      end
    end
  end
end
