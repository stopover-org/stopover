# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::UpdateBooking, type: :mutation do
  let(:mutation) do
    "
      mutation UpdateBooking($input: UpdateBookingInput!) {
        updateBooking(input: $input) {
          booking {
            id
            bookedFor
            eventOptions {
              id
              forAttendee
            }
          }

          errors
          notification
        }
      }
    "
  end
  let!(:booking) { create(:booking) }
  let(:schedule) { booking.event.schedules.first }
  let(:current_user) { booking.firm.accounts.last.user }
  let(:event_options) { create_list(:event_option, 4, for_attendee: false, event: booking.event) }

  let(:input) do
    { bookingId: GraphqlSchema.id_from_object(booking),
      bookedFor: schedule.scheduled_for }
  end
  before { schedule.update(scheduled_for: 10.days.from_now) }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do |with_options|
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Booking.count }.by(0)

      expect(result.dig(:data, :updateBooking, :booking, :id)).to eq(GraphqlSchema.id_from_object(booking))
      expect(result.dig(:data, :updateBooking, :booking, :bookedFor)).to eq(schedule.scheduled_for.iso8601)
      if with_options
        result.dig(:data, :updateBooking, :booking, :eventOptions).each_with_index do |opt, idx|
          expect(opt[:id]).to eq(GraphqlSchema.id_from_object(event_options[idx]))
          expect(opt[:forAttendee]).to eq(false)
        end
      end
      expect(result.dig(:data, :updateBooking, :notification)).to eq('Booking updated')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Booking.count }.by(0)

      expect(result.dig(:data, :updateBooking, :booking)).to be_nil
      expect(result.dig(:data, :updateBooking, :errors)).to include(error)
    end
  end

  context 'update booking' do
    context 'as manager' do
      context 'with event options' do
        before { input[:eventOptionIds] = event_options.map { |opt| GraphqlSchema.id_from_object(opt) } }
        context 'for not paid booking' do
          include_examples :successful, true
        end

        context 'for partially paid booking' do
          let(:booking) { create(:partially_paid_booking) }
          include_examples :successful, true
        end

        context 'for fully paid booking' do
          let(:booking) { create(:partially_paid_booking) }
          include_examples :successful, true
        end
      end

      context 'without event_options' do
        context 'for not paid booking' do
          include_examples :successful, false
        end

        context 'for partially paid booking' do
          let(:booking) { create(:partially_paid_booking) }
          include_examples :successful, false
        end

        context 'for fully paid booking' do
          let(:booking) { create(:fully_paid_booking) }
          include_examples :successful, false
        end
      end
    end

    context 'as common user' do
      let(:current_user) { booking.user }

      context 'with event options' do
        before { input[:eventOptionIds] = event_options.map { |opt| GraphqlSchema.id_from_object(opt) } }
        context 'for not paid booking' do
          include_examples :successful, true
        end
      end

      context 'without event_options' do
        context 'for not paid booking' do
          include_examples :successful, true
        end
      end
    end

    context 'permissions' do
      context 'with event options for bookings' do
        before { input[:eventOptionIds] = create_list(:event_option, 4, event: booking.event, for_attendee: true).map { |opt| GraphqlSchema.id_from_object(opt) } }
        include_examples :fail, 'Something went wrong'
      end

      context 'for past schedule' do
        before { schedule.update(scheduled_for: 5.days.ago) }
        include_examples :fail, 'Event past'
      end

      context 'for past booking' do
        before { booking.schedule.update(scheduled_for: 5.days.ago) }
        include_examples :fail, 'Something went wrong'
      end

      context 'for cancelled booking' do
        before { booking.update(status: 'cancelled') }
        include_examples :fail, 'Booking cancelled'
      end

      context 'for partially paid booking' do
        context 'as common user' do
          let(:booking) { create(:partially_paid_booking) }
          let(:current_user) { booking.user }
          include_examples :fail, 'Booking paid'
        end
      end

      context 'for fully paid booking' do
        context 'as common user' do
          let(:booking) { create(:fully_paid_booking) }
          let(:current_user) { booking.user }
          include_examples :fail, 'Booking paid'
        end
      end

      context 'as manager of another company' do
        let!(:current_user) { create(:firm).accounts.last.user }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
