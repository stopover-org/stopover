# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::QueryType, type: :graphql_type do
  let!(:current_user) { create(:active_user, with_account: true) }
  let!(:interest) { create(:interest) }
  let!(:event) { create(:recurring_event) }
  let!(:trip) { create(:trip, account: current_user.account) }
  let!(:booking) { create(:booking, event: event, trip: trip, schedule: event.schedules.last) }
  before do
    Event.reindex_test
    Booking.reindex_test
    Interest.reindex_test
    Schedule.reindex_test
  end

  let(:query) do
    <<-GRAPHQL
      query {
        currentUser {
          id
        }
        events {
          edges {
            node {
              id
            }
          }
        }
        interests {
          id
        }
        schedules {
          edges {
            node {
              id
            }
          }
        }
        eventFilters {
          city
          startDate
          endDate
          minPrice {
            cents
          }
          maxPrice {
            cents
          }
        }
        event(id: "#{GraphqlSchema.id_from_object(event)}") {
          id
        }
        firm(id: "#{GraphqlSchema.id_from_object(event.firm)}") {
          id
        }
        booking(id: "#{GraphqlSchema.id_from_object(booking)}") {
          id
        }
        trips {
          id
        }
        eventsAutocomplete(query: "query") {
          events {
            id
          }
          bookings {
            id
          }
          interests {
            id
          }
        }
      }
    GRAPHQL
  end

  subject { GraphqlSchema.execute(query, context: { current_user: current_user }).to_h.deep_symbolize_keys }

  it 'check query' do
    result = subject

    assert_equal GraphqlSchema.id_from_object(current_user), result.dig(:data, :currentUser, :id)
    assert_equal GraphqlSchema.id_from_object(event), result.dig(:data, :events, :edges, 0, :node, :id)
    assert_equal GraphqlSchema.id_from_object(interest), result.dig(:data, :interests, 0, :id)
    assert_equal GraphqlSchema.id_from_object(event.schedules.first), result.dig(:data, :schedules, :edges, 0, :node, :id)
    assert_equal({ city: '',
                   startDate: '2024-01-21T00:00:00+01:00',
                   endDate: '2025-01-21T23:00:00+01:00',
                   minPrice: { cents: 550 },
                   maxPrice: { cents: 550 } }, result.dig(:data, :eventFilters))
    assert_equal GraphqlSchema.id_from_object(current_user), result.dig(:data, :currentUser, :id)
    assert_equal GraphqlSchema.id_from_object(event), result.dig(:data, :event, :id)
    assert_equal GraphqlSchema.id_from_object(event.firm), result.dig(:data, :firm, :id)
    assert_equal GraphqlSchema.id_from_object(booking), result.dig(:data, :booking, :id)
    assert_equal GraphqlSchema.id_from_object(booking.trip), result.dig(:data, :trips, 0, :id)
    assert_equal(nil, result.dig(:data, :eventsAutocomplete, :events, 0, :id))
    assert_equal(nil, result.dig(:data, :eventsAutocomplete, :bookings, 0, :id))
    assert_equal(nil, result.dig(:data, :eventsAutocomplete, :interests, 0, :id))
  end

  it 'booking permission' do
    booking.update(trip: create(:trip))

    result = subject

    assert_nil result.dig(:data, :booking, :id)
  end
end
