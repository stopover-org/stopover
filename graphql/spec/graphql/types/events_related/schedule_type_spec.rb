# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::EventsRelated::InterestType, type: :graphql_type do
  let(:variables) { {} }
  let(:event) { create(:recurring_event, status: :published) }
  let(:schedule) { event.schedules.last }
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
          __type(name:"Schedule") {
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
                                                            name: 'availablePlacesPlacement'
                                                          },
                                                          {
                                                            name: 'bookedPlaces'
                                                          },
                                                          {
                                                            name: 'bookings'
                                                          },
                                                          {
                                                            name: 'event'
                                                          },
                                                          {
                                                            name: 'id'
                                                          },
                                                          {
                                                            name: 'leftPlaces'
                                                          },
                                                          {
                                                            name: 'scheduledFor'
                                                          },
                                                          {
                                                            name: 'statistics'
                                                          },
                                                          {
                                                            name: 'status'
                                                          }
                                                        ])
    end
  end

  context 'bookings' do
    let(:current_user) { event.firm.accounts.last.user }
    let(:query) do
      <<-GRAPHQL
        query($scheduleId: ID!, $filters: BookingsFilter!) {
          currentUser {
            account {
              firm {
                schedule(id: $scheduleId) {
                  bookings(filters: $filters) {
                    edges {
                      node {
                        id
                        bookedFor
                      }
                    }
                    total
                  }
                }
              }
            }
          }
        }
      GRAPHQL
    end

    before do
      create_list(:booking, 10, event: event, schedule: schedule)
      create_list(:booking, 10)

      Booking.reindex_test
    end

    context 'without filters' do
      let(:variables) { { scheduleId: GraphqlSchema.id_from_object(schedule), filters: {} } }

      it 'only belonging to event' do
        result = subject

        expect(Booking.count).to eq(20)
        expect(event.bookings.count).to eq(10)
        expect(result.dig(:data, :currentUser, :account, :firm, :schedule, :bookings, :edges).count).to eq(10)
        expect(result.dig(:data, :currentUser, :account, :firm, :schedule, :bookings, :total)).to eq(10)
        result_ids = result.dig(:data, :currentUser, :account, :firm, :schedule, :bookings, :edges)
                           .map { |edge| edge.dig(:node, :id) }
        result_ids.each do |booking_id|
          booking = GraphqlSchema.object_from_id(booking_id)
          expect(booking.event).to eq(event)
        end
      end
    end

    context 'filtered by contact email' do
      let(:variables) { { scheduleId: GraphqlSchema.id_from_object(schedule), filters: { contactEmail: 'mail@stopoverx.com' } } }

      before do
        event.bookings.last.account.update!(primary_email: 'mail@stopoverx.com')

        Booking.reindex_test
      end

      it 'success' do
        result = subject

        expect(result.dig(:data, :currentUser, :account, :firm, :schedule, :bookings, :edges).count).to eq(1)
        expect(result.dig(:data, :currentUser, :account, :firm, :schedule, :bookings, :total)).to eq(1)
      end
    end

    context 'filtered by contact phone' do
      let(:variables) { { scheduleId: GraphqlSchema.id_from_object(schedule), filters: { contactPhone: '+38199999999' } } }

      before do
        event.bookings.last.account.update!(primary_phone: '+38199999999')

        Booking.reindex_test
      end

      it 'success' do
        result = subject

        expect(result.dig(:data, :currentUser, :account, :firm, :schedule, :bookings, :edges).count).to eq(1)
        expect(result.dig(:data, :currentUser, :account, :firm, :schedule, :bookings, :total)).to eq(1)
      end
    end
  end

  context 'places' do
    let(:variables) { { scheduleId: GraphqlSchema.id_from_object(schedule) } }
    let(:booking) { create(:booking, event: event, schedule: schedule) }
    let(:current_user) { event.firm.accounts.last.user }
    let(:query) do
      <<-GRAPHQL
        query($scheduleId: ID!) {
          currentUser {
            account {
              firm {
                schedule(id: $scheduleId) {
                  bookedPlaces
                  leftPlaces
                  availablePlacesPlacement {
                    coordinates
                  }
                }
              }
            }
          }
        }
      GRAPHQL
    end

    before do
      event.update!(max_attendees: 15)
      Attendee.destroy_all
      create_list(:attendee, 4, booking: booking, status: :registered)
      create_list(:attendee, 5, booking: booking, status: :not_registered)
      create_list(:attendee, 5, booking: booking, status: :removed)
    end

    it 'booked places' do
      result = subject

      expect(booking.attendees.where(status: %w[registered not_registered]).count).to eq(10)
      expect(result.dig(:data, :currentUser, :account, :firm, :schedule, :bookedPlaces)).to eq(10)
    end

    it 'left places' do
      result = subject

      expect(booking.attendees.where(status: 'removed').count).to eq(5)
      expect(result.dig(:data, :currentUser, :account, :firm, :schedule, :leftPlaces)).to eq(5)
    end

    context 'with placement' do
      before { create(:event_placement, event: event) }
      context 'without attendees' do
        it 'available places placement' do
          result = subject

          expect(result.dig(:data, :currentUser, :account, :firm, :schedule, :availablePlacesPlacement)).to eq([{ coordinates: [0, 0] },
                                                                                                                { coordinates: [0, 1] },
                                                                                                                { coordinates: [0, 2] },
                                                                                                                { coordinates: [0, 3] },
                                                                                                                { coordinates: [0, 4] },
                                                                                                                { coordinates: [1, 0] },
                                                                                                                { coordinates: [1, 1] },
                                                                                                                { coordinates: [1, 2] },
                                                                                                                { coordinates: [1, 3] },
                                                                                                                { coordinates: [1, 4] },
                                                                                                                { coordinates: [2, 0] },
                                                                                                                { coordinates: [2, 1] },
                                                                                                                { coordinates: [2, 2] },
                                                                                                                { coordinates: [2, 3] },
                                                                                                                { coordinates: [2, 4] },
                                                                                                                { coordinates: [3, 0] },
                                                                                                                { coordinates: [3, 1] },
                                                                                                                { coordinates: [3, 2] },
                                                                                                                { coordinates: [3, 3] },
                                                                                                                { coordinates: [3, 4] },
                                                                                                                { coordinates: [4, 0] },
                                                                                                                { coordinates: [4, 1] },
                                                                                                                { coordinates: [4, 2] },
                                                                                                                { coordinates: [4, 3] },
                                                                                                                { coordinates: [4, 4] },
                                                                                                                { coordinates: [5, 0] },
                                                                                                                { coordinates: [5, 1] },
                                                                                                                { coordinates: [5, 2] },
                                                                                                                { coordinates: [5, 3] },
                                                                                                                { coordinates: [5, 4] },
                                                                                                                { coordinates: [6, 0] },
                                                                                                                { coordinates: [6, 1] },
                                                                                                                { coordinates: [6, 2] },
                                                                                                                { coordinates: [6, 3] },
                                                                                                                { coordinates: [6, 4] }])
        end
      end

      context 'with attendees' do
        before do
          create(:attendee, place: [0, 0], schedule: event.schedules.last)
        end
        it 'available places placement' do
          result = subject

          expect(result.dig(:data, :currentUser, :account, :firm, :schedule, :availablePlacesPlacement)).to eq([{ coordinates: [0, 1] },
                                                                                                                { coordinates: [0, 2] },
                                                                                                                { coordinates: [0, 3] },
                                                                                                                { coordinates: [0, 4] },
                                                                                                                { coordinates: [1, 0] },
                                                                                                                { coordinates: [1, 1] },
                                                                                                                { coordinates: [1, 2] },
                                                                                                                { coordinates: [1, 3] },
                                                                                                                { coordinates: [1, 4] },
                                                                                                                { coordinates: [2, 0] },
                                                                                                                { coordinates: [2, 1] },
                                                                                                                { coordinates: [2, 2] },
                                                                                                                { coordinates: [2, 3] },
                                                                                                                { coordinates: [2, 4] },
                                                                                                                { coordinates: [3, 0] },
                                                                                                                { coordinates: [3, 1] },
                                                                                                                { coordinates: [3, 2] },
                                                                                                                { coordinates: [3, 3] },
                                                                                                                { coordinates: [3, 4] },
                                                                                                                { coordinates: [4, 0] },
                                                                                                                { coordinates: [4, 1] },
                                                                                                                { coordinates: [4, 2] },
                                                                                                                { coordinates: [4, 3] },
                                                                                                                { coordinates: [4, 4] },
                                                                                                                { coordinates: [5, 0] },
                                                                                                                { coordinates: [5, 1] },
                                                                                                                { coordinates: [5, 2] },
                                                                                                                { coordinates: [5, 3] },
                                                                                                                { coordinates: [5, 4] },
                                                                                                                { coordinates: [6, 0] },
                                                                                                                { coordinates: [6, 1] },
                                                                                                                { coordinates: [6, 2] },
                                                                                                                { coordinates: [6, 3] },
                                                                                                                { coordinates: [6, 4] }])
        end
      end
    end
  end

  context 'statistics' do
    let(:variables) { { scheduleId: GraphqlSchema.id_from_object(schedule) } }
    let(:current_user) { event.firm.accounts.last.user }
    let(:query) do
      <<-GRAPHQL
        query($scheduleId: ID!) {
          currentUser {
            account {
              firm {
                schedule(id: $scheduleId) {
                  statistics {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      GRAPHQL
    end

    before do
      create_list(:booking, 10, event: event, schedule: schedule)
      create_list(:booking, 10, status: 'paid', event: event, schedule: schedule)
    end

    it 'success' do
      result = subject

      expect(result.dig(:data, :currentUser, :account, :firm, :schedule, :statistics)).to eq([{ name: 'bookings',
                                                                                                value: 20.0 },
                                                                                              { name: 'paid',
                                                                                                value: 10.0 }])
    end
  end
end
