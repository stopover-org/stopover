# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::EventsRelated::EventType, type: :graphql_type do
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
          __type(name:"Event") {
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
                                                            name: 'address'
                                                          },
                                                          {
                                                            name: 'attendeePricePerUom'
                                                          },
                                                          {
                                                            name: 'availableDates'
                                                          },
                                                          {
                                                            name: 'averageRating'
                                                          },
                                                          {
                                                            name: 'bookingCancellationOptions'
                                                          },
                                                          {
                                                            name: 'bookings'
                                                          },
                                                          {
                                                            name: 'depositAmount'
                                                          },
                                                          {
                                                            name: 'description'
                                                          },
                                                          {
                                                            name: 'durationTime'
                                                          },
                                                          {
                                                            name: 'endDate'
                                                          },
                                                          {
                                                            name: 'eventOptions'
                                                          },
                                                          {
                                                            name: 'eventPlacements'
                                                          },
                                                          {
                                                            name: 'eventType'
                                                          },
                                                          {
                                                            name: 'externalId'
                                                          },
                                                          {
                                                            name: 'featured'
                                                          },
                                                          {
                                                            name: 'firm'
                                                          },
                                                          {
                                                            name: 'id'
                                                          },
                                                          {
                                                            name: 'images'
                                                          },
                                                          {
                                                            name: 'interests'
                                                          },
                                                          {
                                                            name: 'landmarks'
                                                          },
                                                          {
                                                            name: 'language'
                                                          },
                                                          {
                                                            name: 'maxAttendees'
                                                          },
                                                          {
                                                            name: 'minAttendees'
                                                          },
                                                          {
                                                            name: 'myBookings'
                                                          },
                                                          {
                                                            name: 'organizerPricePerUom'
                                                          },
                                                          {
                                                            name: 'ratingsCount'
                                                          },
                                                          {
                                                            name: 'recurringDaysWithTime'
                                                          },
                                                          {
                                                            name: 'requiresCheckIn'
                                                          },
                                                          {
                                                            name: 'requiresContract'
                                                          },
                                                          {
                                                            name: 'requiresDeposit'
                                                          },
                                                          {
                                                            name: 'requiresPassport'
                                                          },
                                                          {
                                                            name: 'reviews'
                                                          },
                                                          {
                                                            name: 'schedules'
                                                          },
                                                          {
                                                            name: 'singleDaysWithTime'
                                                          },
                                                          {
                                                            name: 'statistics'
                                                          },
                                                          {
                                                            name: 'status'
                                                          },
                                                          {
                                                            name: 'stripeIntegrations'
                                                          },
                                                          {
                                                            name: 'title'
                                                          },
                                                          {
                                                            name: 'tourPlan'
                                                          },
                                                          {
                                                            name: 'tourPlans'
                                                          }
                                                        ])
    end
  end

  context 'translate' do
    let(:query) do
      <<-GRAPHQL
        query($eventId: ID!) {
          event(id: $eventId) {
            title
            description
            durationTime
          }
        }
      GRAPHQL
    end

    context 'with firm scope' do
      let(:current_user) { event.firm.accounts.last.user }

      it 'success' do
        result = subject

        expect(result.dig(:data, :event, :title)).to eq(event.title)
        expect(result.dig(:data, :event, :description)).to eq(event.description)
        expect(result.dig(:data, :event, :durationTime)).to eq(event.duration_time)
      end
    end

    context 'without firm scope' do
      let(:current_user) { create(:active_user, with_account: true) }

      it 'success' do
        expect_any_instance_of(Event).to receive(:translate).with(:title)
                                                            .and_return('Translated Title')
        expect_any_instance_of(Event).to receive(:translate).with(:description)
                                                            .and_return('Translated Description')
        expect_any_instance_of(Event).to receive(:translate).with(:duration_time)
                                                            .and_return('Translated Duration Time')
        result = subject

        expect(result.dig(:data, :event, :title)).to eq('Translated Title')
        expect(result.dig(:data, :event, :description)).to eq('Translated Description')
        expect(result.dig(:data, :event, :durationTime)).to eq('Translated Duration Time')
      end
    end
  end

  context 'statistics' do
    let(:query) do
      <<-GRAPHQL
          query($eventId: ID!) {
            event(id: $eventId) {
              statistics {
                name
                value
              }
            }
          }
      GRAPHQL
    end

    before do
      create_list(:fully_paid_booking, 5, event: event, status: :paid)
      create_list(:partially_paid_booking, 5, event: event)
      create_list(:booking, 5, event: event)
    end

    context 'for not authorized user' do
      it 'success' do
        result = subject

        expect(result.dig(:data, :event, :statistics)).to be_nil
      end
    end

    context 'for authorized user' do
      let(:current_user) { event.firm.accounts.last.user }
      it 'success' do
        result = subject

        expect(result.dig(:data, :event, :statistics).count).to eq(2)
        expect(result.dig(:data, :event, :statistics, 0, :name)).to eq('bookings')
        expect(result.dig(:data, :event, :statistics, 1, :name)).to eq('paid')

        expect(result.dig(:data, :event, :statistics, 0, :value)).to eq(15)
        expect(result.dig(:data, :event, :statistics, 1, :value)).to eq(5)
      end
    end
  end

  context 'bookings' do
    let(:current_user) { event.firm.accounts.last.user }
    let(:query) do
      <<-GRAPHQL
          query($eventId: ID!, $filters: BookingsFilter!) {
            event(id: $eventId) {
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
      GRAPHQL
    end

    before do
      create_list(:booking, 10, event: event)
      create_list(:booking, 10)

      Booking.reindex_test
    end

    context 'for the common user' do
      let(:variables) { { eventId: GraphqlSchema.id_from_object(event), filters: {} } }
      let(:current_user) { create(:active_user, with_account: true) }

      it 'empty bookings' do
        result = subject

        expect(result.dig(:data, :event, :bookings)).to be_nil
      end
    end

    context 'without filters' do
      let(:variables) { { eventId: GraphqlSchema.id_from_object(event), filters: {} } }

      it 'only belonging to event' do
        result = subject

        expect(Booking.count).to eq(20)
        expect(event.bookings.count).to eq(10)
        expect(result.dig(:data, :event, :bookings, :edges).count).to eq(10)
        expect(result.dig(:data, :event, :bookings, :total)).to eq(10)
        result_ids = result.dig(:data, :event, :bookings, :edges)
                           .map { |edge| edge.dig(:node, :id) }
        result_ids.each do |booking_id|
          booking = GraphqlSchema.object_from_id(booking_id)
          expect(booking.event).to eq(event)
        end
      end
    end

    context 'filtered by date' do
      let(:variables) { { eventId: GraphqlSchema.id_from_object(event), filters: { bookedFor: Time.zone.today + 3.days } } }

      before do
        event.bookings.last(5).each do |booking|
          booking.update!(schedule: create(:schedule, event: event, scheduled_for: Time.zone.now.at_beginning_of_hour + 3.days))
        end

        Booking.reindex_test
        Event.reindex_test
      end

      it 'success' do
        result = subject

        expect(Booking.count).to eq(20)
        expect(event.bookings.count).to eq(10)
        expect(result.dig(:data, :event, :bookings, :edges).count).to eq(5)
        expect(result.dig(:data, :event, :bookings, :total)).to eq(5)
        result_nodes = result.dig(:data, :event, :bookings, :edges)
                             .pluck(:node)
        result_nodes.each do |node|
          booking_id = node[:id]
          booking = GraphqlSchema.object_from_id(booking_id)
          expect(booking.event).to eq(event)
          expect(node[:bookedFor].to_datetime).to eq(booking.schedule.scheduled_for.to_datetime)
        end
      end
    end

    context 'filtered by contact email' do
      let(:variables) { { eventId: GraphqlSchema.id_from_object(event), filters: { contactEmail: 'mail@stopoverx.com' } } }

      before do
        event.bookings.last.account.update!(primary_email: 'mail@stopoverx.com')

        Booking.reindex_test
      end

      it 'success' do
        result = subject

        expect(result.dig(:data, :event, :bookings, :edges).count).to eq(1)
        expect(result.dig(:data, :event, :bookings, :total)).to eq(1)
      end
    end

    context 'filtered by contact phone' do
      let(:variables) { { eventId: GraphqlSchema.id_from_object(event), filters: { contactPhone: '+38199999999' } } }

      before do
        event.bookings.last.account.update!(primary_phone: '+38199999999')

        Booking.reindex_test
      end

      it 'success' do
        result = subject

        expect(result.dig(:data, :event, :bookings, :edges).count).to eq(1)
        expect(result.dig(:data, :event, :bookings, :total)).to eq(1)
      end
    end
  end

  context 'schedules' do
    let(:variables) { { eventId: GraphqlSchema.id_from_object(event), filters: {} } }
    let(:query) do
      <<-GRAPHQL
        query($eventId: ID!, $filters: SchedulesFilter!) {
          event(id: $eventId) {
            schedules(filters: $filters) {
              edges {
                node {
                  scheduledFor
                }
              }
              total
            }
          }
        }
      GRAPHQL
    end

    before do
      event
      event.schedules.first(5).each_with_index do |schedule, index|
        schedule.update!(scheduled_for: Time.zone.now - index.days)
      end
      Schedule.reindex_test
    end

    it 'only future schedules' do
      result = subject

      expect(result.dig(:data, :event, :schedules, :total)).to eq(52)
      expect(result.dig(:data, :event, :schedules, :edges).count).to eq(30)
    end

    context 'filter by date' do
      let(:variables) { { eventId: GraphqlSchema.id_from_object(event), filters: { scheduledFor: Time.zone.today } } }

      it 'success' do
        result = subject

        expect(result.dig(:data, :event, :schedules, :total)).to eq(1)
        expect(result.dig(:data, :event, :schedules, :edges).count).to eq(1)
      end
    end

    context 'include past dates' do
      let(:variables) { { eventId: GraphqlSchema.id_from_object(event), filters: { includePast: true } } }

      it 'success' do
        result = subject

        expect(result.dig(:data, :event, :schedules, :total)).to eq(56)
        expect(result.dig(:data, :event, :schedules, :edges).count).to eq(30)
      end
    end
  end

  context 'my bookings' do
    let!(:booking) { create(:booking, event: event, schedule: event.schedules.last, trip: create(:trip, account: current_user.account)) }
    let(:query) do
      <<-GRAPHQL
        query($eventId: ID!) {
          event(id: $eventId) {
            myBookings {
              id
            }
          }
        }
      GRAPHQL
    end

    it 'success' do
      result = subject

      expect(result.dig(:data, :event, :myBookings).count).to eq(1)
    end
  end

  context 'stripe integrations' do
    let!(:event_options) { create_list(:event_option, 4, event: event) }
    let(:query) do
      <<-GRAPHQL
        query($eventId: ID!) {
          event(id: $eventId) {
            stripeIntegrations {
              nodes {
                id
              }
            }
          }
        }
      GRAPHQL
    end

    context 'for not authorized user' do
      it 'include event and event options stripe integrations' do
        result = subject

        expect(result.dig(:data, :event, :stripeIntegrations)).to be_nil
      end
    end

    context 'for authorized user' do
      let(:current_user) { event.firm.accounts.last.user }
      it 'include event and event options stripe integrations' do
        result = subject

        expect(result.dig(:data, :event, :stripeIntegrations, :nodes).count).to eq(5)
      end
    end
  end
end
