# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::QueryType, type: :graphql_type do
  let(:variables) { {} }
  let(:current_user) { create(:active_user, with_account: true) }
  let!(:interest) { create(:interest) }
  let!(:event) { create(:recurring_event, firm: create(:firm, status: :active)) }
  let!(:trip) { create(:trip, account: current_user.account) if current_user.active? }
  let!(:booking) { create(:booking, event: event, trip: trip, schedule: event.schedules.last) if trip }

  subject do
    GraphqlSchema.execute(query,
                          variables: variables,
                          context: { current_user: current_user }).to_h.deep_symbolize_keys
  end

  context 'all fields and mutations' do
    let(:query) do
      <<-GRAPHQL
        query {
          __schema {
            queryType {
              fields {
                name
              }
            }
            mutationType {
              fields {
                name
              }
            }
          }
        }
      GRAPHQL
    end

    it 'from schema' do
      result = subject
      expected = { data:
                     { __schema: {
                       queryType: {
                         fields: [
                           {
                             name: 'article'
                           },
                           {
                             name: 'articles'
                           },
                           {
                             name: 'booking'
                           },
                           {
                             name: 'currentUser'
                           },
                           {
                             name: 'event'
                           },
                           {
                             name: 'eventFilters'
                           },
                           {
                             name: 'events'
                           },
                           {
                             name: 'eventsAutocomplete'
                           },
                           {
                             name: 'firm'
                           },
                           {
                             name: 'interest'
                           },
                           {
                             name: 'interests'
                           },
                           {
                             name: 'node'
                           },
                           {
                             name: 'nodes'
                           },
                           {
                             name: 'trips'
                           }
                         ]
                       },
                       mutationType: {
                         fields: [
                           {
                             name: 'addAttendee'
                           },
                           {
                             name: 'bookEvent'
                           },
                           {
                             name: 'cancelBooking'
                           },
                           {
                             name: 'cancelTrip'
                           },
                           {
                             name: 'changeAttendeeOptionAvailability'
                           },
                           {
                             name: 'changeBookingOptionAvailability'
                           },
                           {
                             name: 'changeEventOptionAvailability'
                           },
                           {
                             name: 'createArticle'
                           },
                           {
                             name: 'createCheckout'
                           },
                           {
                             name: 'createEvent'
                           },
                           {
                             name: 'createFirm'
                           },
                           {
                             name: 'createInterest'
                           },
                           {
                             name: 'createNotification'
                           },
                           {
                             name: 'createPlacement'
                           },
                           {
                             name: 'createStripeAccount'
                           },
                           {
                             name: 'declineStripeConnect'
                           },
                           {
                             name: 'deregisterAttendee'
                           },
                           {
                             name: 'inviteUser'
                           },
                           {
                             name: 'populateDummy'
                           },
                           {
                             name: 'publishEvent'
                           },
                           {
                             name: 'registerAttendee'
                           },
                           {
                             name: 'removeAttendee'
                           },
                           {
                             name: 'removeEvent'
                           },
                           {
                             name: 'removeFirm'
                           },
                           {
                             name: 'rescheduleEvent'
                           },
                           {
                             name: 'setCurrentFirm'
                           },
                           {
                             name: 'signIn'
                           },
                           {
                             name: 'signOut'
                           },
                           {
                             name: 'syncStripe'
                           },
                           {
                             name: 'unpublishEvent'
                           },
                           {
                             name: 'updateAccount'
                           },
                           {
                             name: 'updateArticle'
                           },
                           {
                             name: 'updateAttendee'
                           },
                           {
                             name: 'updateBooking'
                           },
                           {
                             name: 'updateEvent'
                           },
                           {
                             name: 'updateFirm'
                           },
                           {
                             name: 'updateInterest'
                           },
                           {
                             name: 'updatePlacement'
                           },
                           {
                             name: 'updateSeoMetadata'
                           },
                           {
                             name: 'verifyEvent'
                           },
                           {
                             name: 'verifyFirm'
                           },
                           {
                             name: 'verifyStripeConnect'
                           },
                           {
                             name: 'withdrawBalance'
                           }
                         ]
                       }
                     } } }

      assert_equal expected, result
    end
  end

  context 'general type check' do
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
            nodes {
              id
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

    it 'check query' do
      result = subject

      assert_equal GraphqlSchema.id_from_object(current_user), result.dig(:data, :currentUser, :id)
      assert_equal GraphqlSchema.id_from_object(event), result.dig(:data, :events, :edges, 0, :node, :id)
      assert_equal GraphqlSchema.id_from_object(interest), result.dig(:data, :interests, :nodes, 0, :id)
      assert_equal({ city: '',
                     startDate: Time.zone.now.at_beginning_of_day.iso8601,
                     endDate: (Time.zone.now.at_end_of_day + 1.year).iso8601,
                     minPrice: { cents: 550 },
                     maxPrice: { cents: 550 } },
                   result.dig(:data, :eventFilters))
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

  context 'current user' do
    let!(:query) do
      <<-GRAPHQL
        query {
          currentUser {
            id
            status
          }
        }
      GRAPHQL
    end

    context 'signed in user' do
      let!(:current_user) { create(:active_user, with_account: true) }
      it 'success' do
        result = subject

        expect(result.dig(:data, :currentUser, :id)).to eq(GraphqlSchema.id_from_object(current_user))
        expect(result.dig(:data, :currentUser, :status)).to eq('active')
      end
    end

    context 'inactive user' do
      let!(:current_user) { create(:inactive_user) }
      it 'success' do
        result = subject

        expect(result.dig(:data, :currentUser, :id)).to eq(GraphqlSchema.id_from_object(current_user))
        expect(result.dig(:data, :currentUser, :status)).to eq('inactive')
      end
    end

    context 'temporary user' do
      let!(:current_user) { create(:temporary_user) }
      it 'success' do
        result = subject

        expect(result.dig(:data, :currentUser, :id)).to eq(GraphqlSchema.id_from_object(current_user))
        expect(result.dig(:data, :currentUser, :status)).to eq('temporary')
      end
    end

    context 'disabled user' do
      let!(:current_user) { create(:disabled_user) }
      it 'success' do
        result = subject

        expect(result.dig(:data, :currentUser, :id)).to eq(GraphqlSchema.id_from_object(current_user))
        expect(result.dig(:data, :currentUser, :status)).to eq('disabled')
      end
    end
  end

  context 'interests' do
    let(:query) do
      <<-GRAPHQL
        query {
          interests {
              nodes {
                id
                slug
              }
          }
        }
      GRAPHQL
    end

    before do
      create_list(:interest, 49, slug: nil)
    end

    it 'success' do
      result = subject

      expect(result.dig(:data, :interests, :nodes).count).to eq(50)
    end
  end

  context 'events' do
    let(:variables) { { 'filters' => {} } }
    let(:query) do
      <<-GRAPHQL
        query($filters: EventsFilter!) {
          events(first: 10, filters: $filters) {
            edges {
              node {
                id
                title
                interests {
                  id
                  title
                }
                firm {
                  id
                }
                attendeePricePerUom {
                  cents
                }
                organizerPricePerUom {
                  cents
                }
                address {
                  city
                }
                schedules {
                  edges {
                    node {
                      id
                      scheduledFor
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            total
          }
        }
      GRAPHQL
    end
    before do
      create_list(:recurring_event, 4)
    end

    context 'events connection type check' do
      before do
        create_list(:recurring_event, 40)
        Event.reindex_test
      end

      context 'limit' do
        let(:variables) { { 'filters' => {} } }
        it 'default limit' do
          expect(EventsQuery::PER_PAGE).to eq(10)
          result = subject

          expect(result.dig(:data, :events, :pageInfo, :hasNextPage)).to eq(true)
          expect(result.dig(:data, :events, :pageInfo, :hasPreviousPage)).to eq(false)
          expect(result.dig(:data, :events, :pageInfo, :startCursor)).to eq('0')
          expect(result.dig(:data, :events, :pageInfo, :endCursor)).to eq('10')

          expect(result.dig(:data, :events, :edges).count).to eq(10)
          expect(result.dig(:data, :events, :total)).to eq(45)
        end

        context 'nodes' do
          let(:query) do
            <<-GRAPHQL
              query {
                events(first: 20) {
                  nodes {
                    id
                  }
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                  }
                  total
                }
              }
            GRAPHQL
          end

          it 'N elements' do
            result = subject

            expect(result.dig(:data, :events, :pageInfo, :hasNextPage)).to eq(true)
            expect(result.dig(:data, :events, :pageInfo, :hasPreviousPage)).to eq(false)
            expect(result.dig(:data, :events, :pageInfo, :startCursor)).to eq('0')
            expect(result.dig(:data, :events, :pageInfo, :endCursor)).to eq('20')

            expect(result.dig(:data, :events, :nodes).count).to eq(20)
            expect(result.dig(:data, :events, :total)).to eq(45)
          end
        end

        context 'custom limit' do
          let(:query) do
            <<-GRAPHQL
              query {
                events(first: 20) {
                  edges {
                    node {
                      id
                    }
                  }
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                  }
                  total
                }
              }
            GRAPHQL
          end

          it 'N elements' do
            result = subject

            expect(result.dig(:data, :events, :pageInfo, :hasNextPage)).to eq(true)
            expect(result.dig(:data, :events, :pageInfo, :hasPreviousPage)).to eq(false)
            expect(result.dig(:data, :events, :pageInfo, :startCursor)).to eq('0')
            expect(result.dig(:data, :events, :pageInfo, :endCursor)).to eq('20')

            expect(result.dig(:data, :events, :edges).count).to eq(20)
            expect(result.dig(:data, :events, :total)).to eq(45)
          end
        end
      end

      context 'offset' do
        let(:query) do
          <<-GRAPHQL
              query {
                events(after: "10", first: 20) {
                  edges {
                    node {
                      id
                    }
                  }
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                  }
                  total
                }
              }
          GRAPHQL
        end

        it 'with previous and next elements' do
          result = subject

          expect(result.dig(:data, :events, :pageInfo, :hasNextPage)).to eq(true)
          expect(result.dig(:data, :events, :pageInfo, :hasPreviousPage)).to eq(true)
          expect(result.dig(:data, :events, :pageInfo, :startCursor)).to eq('0')
          expect(result.dig(:data, :events, :pageInfo, :endCursor)).to eq('30')

          expect(result.dig(:data, :events, :edges).count).to eq(20)
          expect(result.dig(:data, :events, :total)).to eq(45)
        end
      end
    end

    context 'without filters' do
      context 'include published events' do
        before do
          Event.reindex_test
        end

        it 'success' do
          result = subject

          expect(result.dig(:data, :events, :edges).count).to eq(5)
          expect(result.dig(:data, :events, :total)).to eq(5)
        end
      end

      context 'exclude draft events' do
        before do
          Event.last.update_columns(status: :draft)
          Event.reindex_test
        end

        it 'success' do
          result = subject

          expect(result.dig(:data, :events, :edges).count).to eq(4)
          expect(result.dig(:data, :events, :total)).to eq(4)
        end
      end

      context 'exclude unpublished events' do
        before do
          Event.last.update_columns(status: :unpublished)
          Event.reindex_test
        end

        it 'success' do
          result = subject

          expect(result.dig(:data, :events, :edges).count).to eq(4)
          expect(result.dig(:data, :events, :total)).to eq(4)
        end
      end

      context 'exclude removed events' do
        before do
          Event.last.update_columns(status: :removed)
          Event.reindex_test
        end

        it 'success' do
          result = subject

          expect(result.dig(:data, :events, :edges).count).to eq(4)
          expect(result.dig(:data, :events, :total)).to eq(4)
        end
      end
    end

    context 'by city' do
      let(:variables) { { filters: { city: 'Beograd' } } }

      before do
        Event.last.address.update!(city: 'Beograd')
        Event.reindex_test
      end

      it 'execute' do
        result = subject

        assert_equal 1, result.dig(:data, :events, :edges).count
        assert_equal 'Beograd', result.dig(:data, :events, :edges, 0, :node, :address, :city)
        assert_equal 1, result.dig(:data, :events, :total)
      end
    end

    context 'by dates' do
      before do
        start_date = Time.zone.now.at_beginning_of_day

        Booking.destroy_all
        Schedule.destroy_all

        Event.second.schedules.create!(scheduled_for: start_date + 27.hours + 3.days)
        Event.second.schedules.create!(scheduled_for: start_date + 51.hours + 3.days)
        Event.last.schedules.create!(scheduled_for: start_date + 27.hours)
        Event.last.schedules.create!(scheduled_for: start_date + 51.hours)

        Event.reindex_test
      end

      xcontext 'by start date' do
        let(:variables) { { filters: { startDate: (Time.zone.today + 1.day).iso8601 } } }

        it 'execute. end date missed' do
          result = subject

          assert_equal 2, result.dig(:data, :events, :edges).count
          assert_equal 2, result.dig(:data, :events, :total)
        end
      end

      xcontext 'by end date' do
        let(:variables) { { filters: { endDate: (Time.zone.today + 2.days).iso8601 } } }

        it 'execute. start date missed' do
          result = subject

          assert_equal 2, result.dig(:data, :events, :edges).count
          assert_equal 2, result.dig(:data, :events, :total)
        end
      end

      context 'by min and max dates' do
        let(:variables) do
          { filters: { startDate: (Time.zone.today + 1.day).iso8601,
                       endDate: (Time.zone.today + 2.days).iso8601 } }
        end

        it 'execute' do
          result = subject

          assert_equal 1, result.dig(:data, :events, :edges).count
          assert_equal 1, result.dig(:data, :events, :total)
        end
      end
    end

    context 'by price' do
      before do
        Event.update_all(organizer_price_per_uom_cents: nil,
                         attendee_price_per_uom_cents: nil)
        Event.first.update!(organizer_price_per_uom_cents: 20_000,
                            attendee_price_per_uom_cents: 20_000)
        Event.second.update!(organizer_price_per_uom_cents: 10_000,
                             attendee_price_per_uom_cents: 10_000)
        Event.reindex_test
      end

      context 'by min price' do
        let(:variables) { { filters: { minPrice: 90 } } }

        it 'ignore params' do
          result = subject

          assert_equal 5, result.dig(:data, :events, :edges).count
          assert_equal 5, result.dig(:data, :events, :total)
        end
      end

      context 'by max price' do
        let(:variables) { { filters: { maxPrice: 110 } } }

        it 'ignore params' do
          result = subject

          assert_equal 5, result.dig(:data, :events, :edges).count
          assert_equal 5, result.dig(:data, :events, :total)
        end
      end

      context 'by min max prices' do
        let(:variables) { { filters: { minPrice: 90, maxPrice: 110 } } }

        it 'execute' do
          result = subject

          assert_equal 1, result.dig(:data, :events, :edges).count
          assert_equal 1, result.dig(:data, :events, :total)
        end
      end
    end

    context 'by interests' do
      let(:variables) { { filters: {} } }
      let(:interests) { Interest.all }

      before do
        EventInterest.destroy_all
        Interest.destroy_all
        create_list(:interest, 2)
        Interest.all.each_with_index { |interest, index| interest.event_interests.create!(event: Event.all[index]) }
        Event.reindex_test
      end

      context 'without filters' do
        it 'success' do
          result = subject

          assert_equal 5, result.dig(:data, :events, :edges).count
          assert_equal 5, result.dig(:data, :events, :total)
        end
      end

      context 'by one interest' do
        let!(:variables) { { filters: { interests: [interests.first.slug] } } }

        it 'success' do
          result = subject

          assert_equal 1, result.dig(:data, :events, :edges).count
          assert_equal 1, result.dig(:data, :events, :total)
        end
      end

      context 'by many interests' do
        let!(:variables) { { filters: { interests: interests.pluck(:slug) } } }

        it 'success' do
          result = subject

          assert_equal 2, result.dig(:data, :events, :edges).count
          assert_equal 2, result.dig(:data, :events, :total)
        end
      end
    end

    context 'by firm' do
      let(:variables) { { filters: {} } }

      context 'without firm' do
        before do
          Event.reindex_test
        end

        it 'success' do
          result = subject

          assert_equal 5, result.dig(:data, :events, :edges).count
          assert_equal 5, result.dig(:data, :events, :total)
        end
      end

      context 'by firm' do
        let(:variables) { { filters: { firmId: GraphqlSchema.id_from_object(Event.first.firm) } } }

        before do
          Event.first.update!(firm: create(:firm))
          Event.reindex_test
        end

        it 'success' do
          result = subject

          assert_equal 1, result.dig(:data, :events, :edges).count
          assert_equal 1, result.dig(:data, :events, :total)
        end
      end
    end

    context 'with query' do
      let(:variables) { { filters: { query: 'Cruise' } } }

      before do
        Event.update_all(title: 'event title')
        Event.last.update(title: 'Cruise 123')
        Event.reindex_test
      end

      it 'success' do
        result = subject

        expect(result.dig(:data, :events, :edges).count).to eq(1)
        expect(result.dig(:data, :events, :total)).to eq(1)
      end
    end
  end

  context 'event filters' do
    before do
      create_list(:booking, 5,
                  event: event,
                  trip: trip,
                  schedule: event.schedules.last)
      create_list(:recurring_event, 5)
      Event.all.each_with_index do |event, index|
        event.schedules.create!(scheduled_for: Time.zone.now + index.day)
        event.update!(organizer_price_per_uom_cents: 1000 + (1000 * index))
      end
      Address.update_all(city: 'Beograd')
      Event.reindex_test
      Event.searchkick_index.refresh
    end

    context 'without city' do
      let(:variables) { { city: '' } }
      let(:query) do
        <<-GRAPHQL
          query($city: String!) {
            eventFilters(city: $city) {
              startDate
              endDate
              minPrice {
                cents
              }
              maxPrice {
                cents
              }
              city
            }
          }
        GRAPHQL
      end

      xit 'success' do
        result = subject

        expect(result.dig(:data, :eventFilters, :startDate)).to eq(Time.zone.now.at_beginning_of_day.iso8601)
        expect(result.dig(:data, :eventFilters, :endDate)).to eq((Time.zone.now.at_end_of_day + 1.year).iso8601)
        expect(result.dig(:data, :eventFilters, :minPrice, :cents)).to eq(1100)
        expect(result.dig(:data, :eventFilters, :maxPrice, :cents)).to eq(6600)
        expect(result.dig(:data, :eventFilters, :city)).to eq('')
      end

      xit 'except draft events' do
        Event.last.update_columns(status: :draft)
        Event.reindex_test
        result = subject

        expect(result.dig(:data, :eventFilters, :startDate)).to eq(Time.zone.now.at_beginning_of_day.iso8601)
        expect(result.dig(:data, :eventFilters, :endDate)).to eq((Time.zone.now.at_end_of_day + 1.year).iso8601)
        expect(result.dig(:data, :eventFilters, :minPrice, :cents)).to eq(1100)
        expect(result.dig(:data, :eventFilters, :maxPrice, :cents)).to eq(5500)
        expect(result.dig(:data, :eventFilters, :city)).to eq('')
      end

      xit 'except unpublished events' do
        Event.last.update_columns(status: :unpublished)
        Event.reindex_test
        result = subject

        expect(result.dig(:data, :eventFilters, :startDate)).to eq(Time.zone.now.at_beginning_of_day.iso8601)
        expect(result.dig(:data, :eventFilters, :endDate)).to eq((Time.zone.now.at_end_of_day + 1.year).iso8601)
        expect(result.dig(:data, :eventFilters, :minPrice, :cents)).to eq(1100)
        expect(result.dig(:data, :eventFilters, :maxPrice, :cents)).to eq(5500)
        expect(result.dig(:data, :eventFilters, :city)).to eq('')
      end

      it 'except removed events' do
        Event.last.update_columns(status: :removed)
        Event.reindex_test
        result = subject

        expect(result.dig(:data, :eventFilters, :startDate)).to eq(Time.zone.now.at_beginning_of_day.iso8601)
        expect(result.dig(:data, :eventFilters, :endDate)).to eq((Time.zone.now.at_end_of_day + 1.year).iso8601)
        expect(result.dig(:data, :eventFilters, :minPrice, :cents)).to eq(1100)
        expect(result.dig(:data, :eventFilters, :maxPrice, :cents)).to eq(5500)
        expect(result.dig(:data, :eventFilters, :city)).to eq('')
      end
    end

    context 'with city' do
      let(:variables) { { city: 'Beograd' } }
      let(:query) do
        <<-GRAPHQL
          query($city: String!) {
            eventFilters(city: $city) {
              startDate
              endDate
              minPrice {
                cents
              }
              maxPrice {
                cents
              }
              city
            }
          }
        GRAPHQL
      end

      it 'success' do
        Address.last.update!(city: 'Novi Sad')
        result = subject

        expect(result.dig(:data, :eventFilters, :startDate)).to eq(Time.zone.now.at_beginning_of_day.iso8601)
        expect(result.dig(:data, :eventFilters, :endDate)).to eq((Time.zone.now.at_end_of_day + 1.year).iso8601)
        expect(result.dig(:data, :eventFilters, :minPrice, :cents)).to eq(1100)
        expect(result.dig(:data, :eventFilters, :maxPrice, :cents)).to eq(6600)
        expect(result.dig(:data, :eventFilters, :city)).to eq('Beograd')
      end
    end
  end

  context 'event' do
    let(:variables) { { eventId: GraphqlSchema.id_from_object(Event.last) } }
    let(:query) do
      <<-GRAPHQL
        query ($eventId: ID!) {
          event(id: $eventId) {
            id
          }
        }
      GRAPHQL
    end

    context 'published' do
      it 'success' do
        result = subject

        expect(result.dig(:data, :event, :id)).to eq(GraphqlSchema.id_from_object(Event.last))
      end
    end

    context 'draft' do
      before do
        Event.last.update(status: :draft)
      end

      it 'not found' do
        result = subject

        expect(result.dig(:data, :event, :id)).to be_nil
      end
    end

    context 'unpublished' do
      before do
        Event.last.update(status: :unpublished)
      end

      it 'not found' do
        result = subject

        expect(result.dig(:data, :event, :id)).to be_nil
      end
    end

    context 'removed' do
      before do
        Event.last.update(status: :removed)
      end

      it 'not found' do
        result = subject

        expect(result.dig(:data, :event, :id)).to be_nil
      end
    end
  end

  context 'firm' do
    let(:variables) { { firmId: GraphqlSchema.id_from_object(Firm.last) } }
    let(:query) do
      <<-GRAPHQL
        query ($firmId: ID!) {
          firm(id: $firmId) {
            id
          }
        }
      GRAPHQL
    end

    context 'pending' do
      before do
        Firm.last.update_columns(status: :pending)
      end

      it 'success' do
        result = subject

        expect(result.dig(:data, :firm, :id)).to be_nil
      end
    end

    context 'active' do
      before do
        Firm.last.update_columns(status: :active)
      end

      it 'success' do
        result = subject

        expect(result.dig(:data, :firm, :id)).to eq(GraphqlSchema.id_from_object(Firm.last))
      end
    end

    context 'removed' do
      before do
        Firm.last.update_columns(status: :removed)
      end

      it 'success' do
        result = subject

        expect(result.dig(:data, :firm, :id)).to be_nil
      end
    end
  end

  context 'booking' do
    let(:variables) { { bookingId: GraphqlSchema.id_from_object(booking) } }
    let(:query) do
      <<-GRAPHQL
        query($bookingId: ID!) {
          booking(id: $bookingId) {
            id
          }
        }
      GRAPHQL
    end

    context 'for the owner' do
      it 'success' do
        result = subject

        expect(result.dig(:data, :booking, :id)).to eq(GraphqlSchema.id_from_object(Booking.last))
      end
    end

    context 'for different user' do
      let(:current_user) { create(:active_user, with_account: true) }
      let(:booking) { create(:booking) }

      it 'success' do
        result = subject

        expect(result.dig(:data, :booking, :id)).to be_nil
      end
    end
  end

  context 'trips' do
    let(:query) do
      <<-GRAPHQL
        query {
          trips {
            id
            status
          }
        }
      GRAPHQL
    end

    context 'active' do
      before do
        Trip.destroy_all
        create_list(:trip, 5, status: :active, account: current_user.account)
      end

      it 'success' do
        result = subject

        expect(result.dig(:data, :trips).count).to eq(5)
        result.dig(:data, :trips).each do |trip|
          expect(trip[:status]).to eq('active')
        end
      end
    end

    context 'draft' do
      before do
        Trip.destroy_all
        create_list(:trip, 5, status: :draft, account: current_user.account)
      end

      it 'success' do
        result = subject

        expect(result.dig(:data, :trips).count).to eq(5)
        result.dig(:data, :trips).each do |trip|
          expect(trip[:status]).to eq('draft')
        end
      end
    end

    context 'cancelled' do
      before do
        Trip.destroy_all
        create_list(:trip, 5, status: :cancelled, account: current_user.account)
      end

      it 'success' do
        result = subject

        expect(result.dig(:data, :trips).count).to eq(0)
      end
    end
  end

  context 'events autocomplete' do
    let(:variables) { { query: 'Cruise' } }
    let(:query) do
      <<-GRAPHQL
        query($query: String!) {
          eventsAutocomplete(query: $query) {
            events {
              id
              title
              status
            }
            bookings {
              id
              status
            }
            interests {
              id
            }
          }
        }
      GRAPHQL
    end

    context 'bookings' do
      context 'only my bookings' do
        before do
          Booking.destroy_all
          Trip.destroy_all

          create_list(:active_user, 5, with_account: true)
          User.all.each do |user|
            user.account.trips << create(:trip, account: user.account)
            user.account.trips << create(:trip, account: user.account)
          end

          create_list(:recurring_event, 8, status: :published, title: 'Cruise')
          create_list(:recurring_event, 3, status: :published, title: 'Tour')
          Trip.all.each do |trip|
            trip.bookings += create_list(:booking, 8, event: Event.find_by(title: 'Cruise'), schedule: Event.last.schedules.last, trip: trip)
          end

          Event.reindex_test
          Booking.reindex_test
          Interest.reindex_test
        end

        it 'success' do
          result = subject

          expect(Booking.search('Cruise').count).to eq(112)
          expect(Booking.search('Cruise', where: { trip_id: current_user&.account&.trips&.ids }).count).to eq(16)
          expect(result.dig(:data, :eventsAutocomplete, :bookings).count).to eq(5)
        end
      end
    end

    context 'events' do
      context 'preselected events' do
        before do
          create_list(:recurring_event, 2)
        end
        let(:variables) { { query: '', ids: Event.first(3).map { |e| GraphqlSchema.id_from_object(e) } } }
        let(:query) do
          <<-GRAPHQL
            query($query: String!, $ids: [ID!]) {
              eventsAutocomplete(query: $query, ids: $ids) {
                events {
                  id
                  title
                  status
                }
                bookings {
                  id
                  status
                }
                interests {
                  id
                }
              }
            }
          GRAPHQL
        end

        it 'success' do
          result = subject

          expect(result.dig(:data, :eventsAutocomplete, :events).count).to eq(3)
          result.dig(:data, :eventsAutocomplete, :events).each do |event|
            expect(Event.first(3).map { |e| GraphqlSchema.id_from_object(e) }).to include(event[:id])
          end
        end
      end

      context 'draft' do
        before do
          Event.destroy_all
          create_list(:event, 3, status: :draft, title: 'Cruise')
          create_list(:event, 3, status: :draft, title: 'Tour')
          Event.reindex_test
          Booking.reindex_test
          Interest.reindex_test
        end

        it 'not found' do
          result = subject

          expect(result.dig(:data, :eventsAutocomplete, :events).count).to eq(0)
        end
      end
      context 'published' do
        before do
          Event.destroy_all
          create_list(:event, 8, status: :published, title: 'Cruise')
          create_list(:event, 3, status: :published, title: 'Tour')
          Event.reindex_test
          Booking.reindex_test
          Interest.reindex_test
        end

        it 'success' do
          result = subject

          expect(Event.search('Cruise').count).to eq(8)

          result.dig(:data, :eventsAutocomplete, :events).each do |event|
            expect(event[:title]).to eq('Cruise')
          end

          expect(result.dig(:data, :eventsAutocomplete, :events).count).to eq(5)
        end
      end
      context 'unpublished' do
        before do
          Event.destroy_all
          create_list(:event, 3, status: :unpublished, title: 'Cruise')
          create_list(:event, 3, status: :unpublished, title: 'Tour')
          Event.reindex_test
          Booking.reindex_test
          Interest.reindex_test
        end

        it 'not found' do
          result = subject

          expect(result.dig(:data, :eventsAutocomplete, :events).count).to eq(0)
        end
      end
      context 'removed' do
        before do
          Event.destroy_all
          create_list(:event, 3, status: :removed, title: 'Cruise')
          create_list(:event, 3, status: :removed, title: 'Tour')
          Event.reindex_test
          Booking.reindex_test
          Interest.reindex_test
        end

        it 'not found' do
          result = subject

          expect(result.dig(:data, :eventsAutocomplete, :events).count).to eq(0)
        end
      end
    end

    context 'interests' do
      before do
        10.times do |n|
          create(:interest, title: "Cruise #{n}")
          create(:interest, title: "Tour #{n}")
        end

        Interest.reindex_test
      end

      it 'success' do
        result = subject

        expect(Interest.search('Cruise').count).to eq(10)
        expect(result.dig(:data, :eventsAutocomplete, :interests).count).to eq(5)
      end
    end
  end
end
