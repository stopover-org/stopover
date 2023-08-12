# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsMutations::CancelBooking do
  let(:default_time) { Time.zone.now.at_beginning_of_hour }
  let(:mutation) do
    "
      mutation CancelBooking($input: CancelBookingInput!) {
        cancelBooking(input: $input) {
          booking {
            status
            refunds {
              status
              penalty {
                amount {
                  cents
                }
              }
            }
          }
          notification
          errors
          redirectUrl
        }
      }
    "
  end

  let(:temporary_user) { create(:temporary_user) }
  let(:customer) { create(:active_user) }
  let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :not_paid_success do
    it 'booking actual priceless' do
      expect(booking.status).to eq('paid')
      expect(booking.left_to_pay_price).to eq(Money.new(0))
      expect(booking.already_paid_price).to eq(Money.new(0))
    end

    it 'success' do
      Timecop.freeze(default_time) do
        result = nil
        debugger
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(1)
                                                            .and change { Notification.trip_booking_cancelled.delivery_method_email.count }.by(1)
                                                            .and change { Notification.firm_refund_created.delivery_method_email.count }.by(0)
                                                            .and change { Notification.trip_refund_created.delivery_method_email.count }.by(0)
                                                            .and change { Refund.count }.by(0)
                                                            .and change { Penalty.count }.by(0)

        expect(result.dig(:data, :cancelBooking, :booking, :status)).to eq('cancelled')
        expect(result.dig(:data, :cancelBooking, :booking, :refunds).count).be eq(0)
        expect(result.dig(:data, :cancelBooking, :errors)).to be_nil
        expect(result.dig(:data, :cancelBooking, :redirectUrl)).to be_nil
        expect(result.dig(:data, :cancelBooking, :notification)).to eq('Booking was cancelled')
      end
    end
  end

  shared_examples :not_paid_fail do |errors:|
    it 'fail' do
      Timecop.freeze(default_time) do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(0)
                                                            .and change { Notification.trip_booking_cancelled.delivery_method_email.count }.by(0)
                                                            .and change { Notification.firm_refund_created.delivery_method_email.count }.by(0)
                                                            .and change { Notification.trip_refund_created.delivery_method_email.count }.by(0)
                                                            .and change { Refund.count }.by(0)
                                                            .and change { Penalty.count }.by(0)

        expect(result.dig(:data, :cancelBooking, :errors)).to eq(errors)
      end
    end
  end

  describe 'as manager' do
    let(:current_user) { booking.firm.accounts.first.user }
    shared_examples :success do
      it 'success' do
        Timecop.freeze(default_time) do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.trip_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.firm_refund_created.delivery_method_email.count }.by(1)
                                                              .and change { Notification.trip_refund_created.delivery_method_email.count }.by(1)
                                                              .and change { Refund.count }.by(1)
                                                              .and change { Penalty.count }.by(1)

          expect(result.dig(:data, :cancelBooking, :booking, :status)).to eq('cancelled')
          expect(result.dig(:data, :cancelBooking, :booking, :refund, :status)).to eq('pending')
          expect(result.dig(:data, :cancelBooking, :booking, :refund, :amount, :cents)).to eq(1000)
          expect(result.dig(:data, :cancelBooking, :booking, :refund, :penalty, :amount, :cents)).to eq(1000)
          expect(result.dig(:data, :cancelBooking, :errors)).to be_nil
          expect(result.dig(:data, :cancelBooking, :redirectUrl)).to be_nil
          expect(result.dig(:data, :cancelBooking, :notification)).to eq('Booking was cancelled')
        end
      end
    end

    shared_examples :fail do |errors:|
      it 'fail' do
        Timecop.freeze(default_time) do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(0)
                                                              .and change { Notification.trip_booking_cancelled.delivery_method_email.count }.by(0)
                                                              .and change { Notification.firm_refund_created.delivery_method_email.count }.by(0)
                                                              .and change { Notification.trip_refund_created.delivery_method_email.count }.by(0)
                                                              .and change { Refund.count }.by(0)
                                                              .and change { Penalty.count }.by(0)

          expect(result.dig(:data, :cancelBooking, :errors)).to eq(errors)
        end
      end
    end

    describe 'active booking' do
      let(:booking) { create(:not_paid_booking, event: create(:free_event)) }

      context 'not paid booking' do
        describe 'without prev refunds' do
          include_examples :not_paid_success
        end

        describe 'with pending refund' do
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          include_examples :fail, errors: ['Booking was cancelled']
        end

        describe 'with cancelled refund' do
          include_examples :success
        end
      end

      context 'deposit paid' do
        describe 'without prev refunds' do
          include_examples :success
        end

        describe 'with pending refund' do
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          include_examples :fail, errors: ['Booking was cancelled']
        end

        describe 'with cancelled refund' do
          include_examples :success
        end
      end

      context 'partially paid' do
        describe 'without prev refunds' do
          include_examples :success
        end

        describe 'with pending refund' do
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          include_examples :fail, errors: ['Booking was cancelled']
        end

        describe 'with cancelled refund' do
          include_examples :success
        end
      end

      context 'fully paid' do
        describe 'without prev refunds' do
          include_examples :success
        end

        describe 'with pending refund' do
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          include_examples :fail, errors: ['Booking was cancelled']
        end

        describe 'with cancelled refund' do
          include_examples :success
        end
      end
    end

    describe 'cancelled booking' do
      include_examples :fail, errors: ['Booking was cancelled']
    end
  end

  describe 'as attendee' do
    let(:current_user) { create(:active_user) }

    shared_examples :success do
      it 'success' do
        Timecop.freeze(default_time) do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.trip_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.firm_refund_created.delivery_method_email.count }.by(1)
                                                              .and change { Notification.trip_refund_created.delivery_method_email.count }.by(1)
                                                              .and change { Refund.count }.by(1)
                                                              .and change { Penalty.count }.by(1)

          expect(result.dig(:data, :cancelBooking, :booking, :status)).to eq('cancelled')
          expect(result.dig(:data, :cancelBooking, :booking, :refund, :status)).to eq('pending')
          expect(result.dig(:data, :cancelBooking, :booking, :refund, :amount, :cents)).to eq(1100)
          expect(result.dig(:data, :cancelBooking, :booking, :penalty, :amount, :cents)).to eq(1100)
          expect(result.dig(:data, :cancelBooking, :errors)).to be_nil
          expect(result.dig(:data, :cancelBooking, :redirectUrl)).to be_nil
          expect(result.dig(:data, :cancelBooking, :notification)).to eq('Booking was cancelled')
        end
      end
    end

    shared_examples :fail do |errors:|
      it 'fail' do
        Timecop.freeze(default_time) do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(0)
                                                              .and change { Notification.trip_booking_cancelled.delivery_method_email.count }.by(0)
                                                              .and change { Notification.firm_refund_created.delivery_method_email.count }.by(0)
                                                              .and change { Notification.trip_refund_created.delivery_method_email.count }.by(0)
                                                              .and change { Refund.count }.by(0)
                                                              .and change { Penalty.count }.by(0)

          expect(result.dig(:data, :cancelBooking, :errors)).to eq(errors)
        end
      end
    end

    describe 'active booking' do
      let(:booking) { create(:not_paid, event: create(:free_event)) }

      context 'not paid booking' do
        describe 'without prev refunds' do
          include_examples :not_paid_success
        end

        describe 'with pending refund' do
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          include_examples :fail, errors: ['Booking was cancelled']
        end

        describe 'with cancelled refund' do
          include_examples :success
        end
      end

      context 'deposit paid' do
        describe 'without prev refunds' do
          include_examples :success
        end

        describe 'with pending refund' do
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          include_examples :fail, errors: ['Booking was cancelled']
        end

        describe 'with cancelled refund' do
          include_examples :success
        end
      end

      context 'partially paid' do
        describe 'without prev refunds' do
          include_examples :success
        end

        describe 'with pending refund' do
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          include_examples :fail, errors: ['Booking was cancelled']
        end

        describe 'with cancelled refund' do
          include_examples :success
        end
      end

      context 'fully paid' do
        describe 'without prev refunds' do
          include_examples :success
        end

        describe 'with pending refund' do
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          include_examples :fail, errors: ['Booking was cancelled']
        end

        describe 'with cancelled refund' do
          include_examples :success
        end
      end
    end

    describe 'cancelled booking' do
      include_examples :fail, errors: ['Booking was cancelled']
    end
  end
end
