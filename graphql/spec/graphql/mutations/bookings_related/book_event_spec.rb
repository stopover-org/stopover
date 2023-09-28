# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::AddAttendee, type: :mutation do
  let(:mutation) do
    "
      mutation BookEvent($input: BookEventInput!) {
        bookEvent(input: $input) {
          booking {
            id
            status
            schedule {
              scheduledFor
            }
          }

          errors
          notification
        }
      }
    "
  end
  let(:event) { create(:recurring_event) }
  let(:current_user) { create(:active_user, with_account: true) }
  let(:schedule) { event.schedules.last }
  let(:scheduled_for) { schedule.scheduled_for }

  let(:input) do
    { eventId: GraphqlSchema.id_from_object(event),
      bookedFor: scheduled_for,
      attendeesCount: 1 }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do
    it 'event' do
      expect(event.status).to eq('published')
    end

    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Booking.count }.by(1)
      booking = Booking.last
      expect(booking.attendees.count).to eq(1)
      expect(result.dig(:data, :bookEvent, :booking, :id)).to eq(GraphqlSchema.id_from_object(booking))
      expect(result.dig(:data, :bookEvent, :booking, :status)).to eq('active')
      expect(result.dig(:data, :bookEvent, :booking, :schedule, :scheduledFor)).to eq(event.schedules.last.scheduled_for.iso8601)
      expect(result.dig(:data, :bookEvent, :notification)).to eq('You booked this event')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Booking.count }.by(0)
      expect(result.dig(:data, :bookEvent, :booking)).to be_nil
      expect(result.dig(:data, :bookEvent, :errors)).to include(error)
    end
  end

  context 'book event' do
    context 'as active user' do
      include_examples :successful
    end

    context 'for already booked event for different schedule' do
      let!(:booking) { create(:booking, schedule: event.schedules.first, event: event) }
      it 'check bookings' do
        expect(event.bookings.count).to eq(1)
        expect(booking.schedule).not_to eq(schedule)
      end
      include_examples :successful
    end

    context 'without user' do
      let(:current_user) { nil }
      include_examples :successful
    end

    context 'with temporary user' do
      let(:current_user) { create(:temporary_user) }
      include_examples :successful
    end

    context 'permissions' do
      context 'for past event' do
        before { schedule.update(scheduled_for: 5.days.ago) }
        include_examples :fail, 'Event past'
      end

      context 'for fully occupied booking' do
        before { event.update(max_attendees: 1) }
        let!(:booking) { create(:booking, event: event, schedule: schedule) }
        include_examples :fail, 'All places are reserved'
      end

      context 'for wrong schedule' do
        let(:scheduled_for) { Date.current + 15.days }
        include_examples :fail, 'Something went wrong'
      end

      context 'with existing booking for the same schedule' do
        let!(:trip) { create(:trip, account: current_user.account) }
        let!(:booking) { create(:booking, event: event, schedule: schedule, trip: trip) }
        include_examples :fail, 'You are already booked this event'
      end
    end
  end
end
