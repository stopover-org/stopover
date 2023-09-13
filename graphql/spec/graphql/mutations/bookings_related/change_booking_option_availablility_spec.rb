# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::ChangeBookingOptionAvailability, type: :mutation do
  let(:mutation) do
    "
      mutation ChangeBookingOptionAvailability($input: ChangeBookingOptionAvailabilityInput!) {
        changeBookingOptionAvailability(input: $input) {
          bookingOption {
            id
            status
          }

          errors
          notification
        }
      }
    "
  end
  let!(:booking_option) { create(:booking_option) }
  let(:current_user) { booking_option.booking.firm.accounts.last.user }

  let(:input) do
    { bookingOptionId: GraphqlSchema.id_from_object(booking_option) }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do |status, message|
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { BookingOption.count }.by(0)

      expect(result.dig(:data, :changeBookingOptionAvailability, :bookingOption, :id)).to eq(GraphqlSchema.id_from_object(booking_option))
      expect(result.dig(:data, :changeBookingOptionAvailability, :bookingOption, :status)).to eq(status)
      expect(result.dig(:data, :changeBookingOptionAvailability, :notification)).to eq(message)
    end
  end

  shared_examples :successful_with_refund do |refund|
    it 'successful with refund' do
      Sidekiq::Testing.inline! do
        booking = booking_option.booking
        expect(booking.already_paid_price - booking.attendee_total_price).to eq(Money.new(0))
        expect(booking_option.attendee_price).to eq(Money.new(refund))

        expect { subject.to_h.deep_symbolize_keys }.to change { Refund.count }.by(1)

        expect(booking.refunds.last.refund_amount).to eq(Money.new(refund))
        expect(booking.refunds.last.penalty_amount).to eq(Money.new(0))
      end
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { BookingOption.count }.by(0)
      expect(result.dig(:data, :changeBookingOptionAvailability, :bookingOption)).to be_nil
      expect(result.dig(:data, :changeBookingOptionAvailability, :errors)).to include(error)
    end
  end

  context 'add attendee' do
    context 'unavailable to available' do
      context 'as manager' do
        before { booking_option.update(status: 'not_available') }
        include_examples :successful, 'available', 'Booking Option is available from now'
      end
    end

    context 'available to unavailable' do
      context 'as manager' do
        before { booking_option.update(status: 'available') }
        include_examples :successful, 'not_available', 'Booking Option is unavailable from now'

        context 'for paid option' do
          let!(:payment) do
            create(:payment,
                   total_price: booking_option.booking.reload.attendee_total_price,
                   booking: booking_option.booking,
                   balance: booking_option.booking.firm.balance,
                   status: 'successful')
          end
          include_examples :successful_with_refund, 440
        end
      end
    end

    context 'permissions' do
      context 'for past booking' do
        before { booking_option.booking.schedule.update(scheduled_for: 5.days.ago) }
        include_examples :fail, 'Event past'
      end

      context 'for cancelled booking' do
        before { booking_option.booking.update(status: 'cancelled') }
        include_examples :fail, 'Booking was cancelled'
      end

      context 'as booking attendee company' do
        let(:current_user) { booking_option.booking.user }
        include_examples :fail, 'You are not authorized'
      end

      context 'as manager of another company' do
        let!(:current_user) { create(:firm).accounts.last.user }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
