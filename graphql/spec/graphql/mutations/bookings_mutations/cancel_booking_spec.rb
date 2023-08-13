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
            cancelledBy {
              id
            }
            refunds {
              status
              amount {
                cents
              }
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
  let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :not_paid_success do
    it 'success' do
      Timecop.freeze(default_time) do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(1)
                                                            .and change { Notification.trip_booking_cancelled.delivery_method_email.count }.by(1)
                                                            .and change { Notification.firm_refund_created.delivery_method_email.count }.by(0)
                                                            .and change { Refund.count }.by(0)
                                                            .and change { Penalty.count }.by(0)

        expect(result.dig(:data, :cancelBooking, :booking, :status)).to eq('cancelled')
        expect(result.dig(:data, :cancelBooking, :booking, :cancelledBy, :id)).to eq(GraphqlSchema.id_from_object(current_user.account))
        expect(result.dig(:data, :cancelBooking, :booking, :refunds).count).to eq(0)
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
                                                            .and change { Refund.count }.by(0)
                                                            .and change { Penalty.count }.by(0)

        expect(result.dig(:data, :cancelBooking, :errors)).to eq(errors)
      end
    end
  end

  describe 'as manager' do
    shared_examples :success do |cancelled_once: false, amount: 500|
      it 'check payments' do
        Timecop.freeze(default_time) do
          expect(booking.payments.successful.count).to eq(1)
          expect(booking.payments.successful.last.total_price).to eq(Money.new(500))
        end
      end

      it 'success' do
        Timecop.freeze(default_time) do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.trip_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.firm_refund_created.delivery_method_email.count }.by(1)
                                                              .and change { Refund.count }.by(1)
                                                              .and change { Penalty.count }.by(0)

          expect(result.dig(:data, :cancelBooking, :booking, :status)).to eq('cancelled')
          expect(result.dig(:data, :cancelBooking, :booking, :cancelledBy, :id)).to eq(GraphqlSchema.id_from_object(current_user.account))
          if cancelled_once
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :status)).to eq('cancelled')
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :amount, :cents)).to eq(amount)
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :penalty)).to be_nil
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 1, :status)).to eq('pending')
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 1, :amount, :cents)).to eq(amount)
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 1, :penalty)).to be_nil
          else
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :status)).to eq('pending')
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :amount, :cents)).to eq(amount)
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :penalty)).to be_nil
          end

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
                                                              .and change { Refund.count }.by(0)
                                                              .and change { Penalty.count }.by(0)

          expect(result.dig(:data, :cancelBooking, :errors)).to eq(errors)
        end
      end
    end

    describe 'free event' do
      let(:booking) { create(:not_paid_booking, event: create(:free_event)) }
      let(:current_user) { booking.firm.accounts.first.user }

      describe 'active booking' do
        it 'booking actual free' do
          expect(booking.status).to eq('paid')
          expect(booking.left_to_pay_price).to eq(Money.new(0))
          expect(booking.already_paid_price).to eq(Money.new(0))
        end

        include_examples :not_paid_success
      end

      describe 'cancelled booking' do
        let(:booking) { create(:not_paid_booking, status: 'cancelled', event: create(:free_event)) }

        it 'booking actual free' do
          expect(booking.left_to_pay_price).to eq(Money.new(0))
          expect(booking.already_paid_price).to eq(Money.new(0))
        end

        include_examples :not_paid_fail, errors: ['Booking was cancelled']
      end
    end

    describe 'active booking' do
      let(:booking) { create(:not_paid_booking) }
      let(:current_user) { booking.firm.accounts.first.user }

      context 'not paid booking' do
        describe 'without prev refunds' do
          include_examples :not_paid_success
        end

        describe 'cancelled booking' do
          let(:booking) { create(:not_paid_booking, status: 'cancelled', event: create(:free_event)) }

          include_examples :not_paid_fail, errors: ['Booking was cancelled']
        end
      end

      context 'partially paid' do
        let(:booking) { create(:partially_paid_booking) }
        describe 'without prev refunds' do
          describe 'with cancellation options' do
            let!(:cancellation_option) { create(:booking_cancellation_option, event: booking.event, penalty_price: Money.new(10)) }
            include_examples :success
          end

          describe 'without cancellation options' do
            include_examples :success
          end
        end

        describe 'with pending refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'pending', amount: Money.new(10)) }
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'processing', amount: Money.new(10)) }
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'successful', amount: Money.new(10)) }
          include_examples :fail, errors: ['Booking was refunded already']
          it 'booking should be paid' do
            expect(booking.status).to eq('paid')
          end
        end

        describe 'with cancelled refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'cancelled', amount: Money.new(500)) }
          include_examples :success, cancelled_once: true
        end
      end

      context 'fully paid' do
        let(:booking) { create(:paid_booking) }
        describe 'without prev refunds' do
          describe 'with cancellation options' do
            let!(:cancellation_option) { create(:booking_cancellation_option, event: booking.event, penalty_price: Money.new(10)) }
            include_examples :success
          end

          describe 'without cancellation options' do
            include_examples :success
          end
        end

        describe 'with pending refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'pending', amount: Money.new(10)) }
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'processing', amount: Money.new(10)) }
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'successful', amount: Money.new(10)) }
          include_examples :fail, errors: ['Booking was refunded already']
        end

        describe 'with cancelled refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'cancelled', amount: Money.new(500)) }
          include_examples :success, cancelled_once: true
        end
      end
    end

    describe 'cancelled booking' do
      let(:booking) { create(:cancelled_booking) }
      let(:current_user) { booking.firm.accounts.first.user }

      include_examples :fail, errors: ['Booking was cancelled']
    end
  end

  describe 'as attendee' do
    shared_examples :success do |cancelled_once: false, amount: 500|
      it 'check payments' do
        Timecop.freeze(default_time) do
          expect(booking.payments.successful.count).to eq(1)
          expect(booking.payments.successful.last.total_price).to eq(Money.new(500))
        end
      end

      it 'success' do
        Timecop.freeze(default_time) do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.trip_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.firm_refund_created.delivery_method_email.count }.by(1)
                                                              .and change { Refund.count }.by(1)
                                                              .and change { Penalty.count }.by(0)

          expect(result.dig(:data, :cancelBooking, :booking, :status)).to eq('cancelled')
          expect(result.dig(:data, :cancelBooking, :booking, :cancelledBy, :id)).to eq(GraphqlSchema.id_from_object(current_user.account))
          if cancelled_once
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :status)).to eq('cancelled')
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :amount, :cents)).to eq(amount)
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :penalty)).to be_nil
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 1, :status)).to eq('pending')
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 1, :amount, :cents)).to eq(amount)
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 1, :penalty)).to be_nil
          else
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :status)).to eq('pending')
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :amount, :cents)).to eq(amount)
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :penalty)).to be_nil
          end

          expect(result.dig(:data, :cancelBooking, :errors)).to be_nil
          expect(result.dig(:data, :cancelBooking, :redirectUrl)).to be_nil
          expect(result.dig(:data, :cancelBooking, :notification)).to eq('Booking was cancelled')
        end
      end
    end

    shared_examples :success_with_cancellation_option do |cancelled_once: false, amount: 490|
      it 'check payments' do
        Timecop.freeze(default_time) do
          expect(booking.payments.successful.count).to eq(1)
          expect(booking.payments.successful.last.total_price).to eq(Money.new(500))

          expect(booking.event.booking_cancellation_options.count).to eq(1)
          expect(booking.current_cancellation_option.deadline).to eq('9999999')
          expect(booking.current_cancellation_option.penalty_price).to eq(Money.new(10))
        end
      end

      it 'success' do
        Timecop.freeze(default_time) do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.trip_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.firm_booking_cancelled.delivery_method_email.count }.by(1)
                                                              .and change { Notification.firm_refund_created.delivery_method_email.count }.by(1)
                                                              .and change { Refund.count }.by(1)
                                                              .and change { Penalty.count }.by(1)

          expect(result.dig(:data, :cancelBooking, :booking, :status)).to eq('cancelled')
          expect(result.dig(:data, :cancelBooking, :booking, :cancelledBy, :id)).to eq(GraphqlSchema.id_from_object(current_user.account))
          if cancelled_once
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :status)).to eq('cancelled')
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :amount, :cents)).to eq(amount)
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :penalty)).to be_nil
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 1, :status)).to eq('pending')
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 1, :amount, :cents)).to eq(amount)
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 1, :penalty, :amount, :cents)).to eq(10)
          else
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :status)).to eq('pending')
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :amount, :cents)).to eq(amount)
            expect(result.dig(:data, :cancelBooking, :booking, :refunds, 0, :penalty, :amount, :cents)).to eq(10)
          end

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
                                                              .and change { Refund.count }.by(0)
                                                              .and change { Penalty.count }.by(0)

          expect(result.dig(:data, :cancelBooking, :errors)).to eq(errors)
        end
      end
    end

    describe 'free event' do
      let(:booking) { create(:not_paid_booking, event: create(:free_event)) }
      let(:current_user) { booking.user }

      describe 'active booking' do
        it 'booking actual free' do
          expect(booking.status).to eq('paid')
          expect(booking.left_to_pay_price).to eq(Money.new(0))
          expect(booking.already_paid_price).to eq(Money.new(0))
        end

        include_examples :not_paid_success
      end

      describe 'cancelled booking' do
        let(:booking) { create(:not_paid_booking, status: 'cancelled', event: create(:free_event)) }
        let(:current_user) { booking.user }

        it 'booking actual free' do
          expect(booking.left_to_pay_price).to eq(Money.new(0))
          expect(booking.already_paid_price).to eq(Money.new(0))
        end

        include_examples :not_paid_fail, errors: ['Booking was cancelled']
      end
    end

    describe 'active booking' do
      let(:booking) { create(:not_paid_booking) }
      let(:current_user) { booking.user }

      context 'not paid booking' do
        describe 'without prev refunds' do
          include_examples :not_paid_success
        end

        describe 'cancelled booking' do
          let(:booking) { create(:not_paid_booking, status: 'cancelled', event: create(:free_event)) }

          include_examples :not_paid_fail, errors: ['Booking was cancelled']
        end
      end

      context 'partially paid' do
        let(:booking) { create(:partially_paid_booking) }
        let(:current_user) { booking.user }
        describe 'without prev refunds' do
          describe 'with cancellation options' do
            let!(:cancellation_option) { create(:booking_cancellation_option, event: booking.event, penalty_price: Money.new(10)) }
            include_examples :success_with_cancellation_option
          end

          describe 'without cancellation options' do
            include_examples :success
          end
        end

        describe 'with pending refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'pending', amount: Money.new(10)) }
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'processing', amount: Money.new(10)) }
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'successful', amount: Money.new(10)) }
          include_examples :fail, errors: ['Booking was refunded already']
          it 'booking should be paid' do
            expect(booking.status).to eq('paid')
          end
        end

        describe 'with cancelled refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'cancelled', amount: Money.new(490)) }
          describe 'with cancellation options' do
            let!(:cancellation_option) { create(:booking_cancellation_option, event: booking.event, penalty_price: Money.new(10)) }
            include_examples :success_with_cancellation_option, cancelled_once: true
          end

          describe 'without cancellation options' do
            let!(:refund) { create(:manager_refund, booking: booking, status: 'cancelled', amount: Money.new(500)) }
            include_examples :success, cancelled_once: true, amount: 500
          end
        end
      end

      context 'fully paid' do
        let(:booking) { create(:paid_booking) }
        let(:current_user) { booking.user }
        describe 'without prev refunds' do
          describe 'with cancellation options' do
            let!(:cancellation_option) { create(:booking_cancellation_option, event: booking.event, penalty_price: Money.new(10)) }
            include_examples :success_with_cancellation_option
          end

          describe 'without cancellation options' do
            include_examples :success
          end
        end

        describe 'with pending refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'pending', amount: Money.new(10)) }
          include_examples :fail, errors: ['Cancellation waiting for approval']
        end

        describe 'with processing refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'processing', amount: Money.new(10)) }
          include_examples :fail, errors: ['Cancellation in progress']
        end

        describe 'with successful refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'successful', amount: Money.new(10)) }
          include_examples :fail, errors: ['Booking was refunded already']
        end

        describe 'with cancelled refund' do
          let!(:refund) { create(:manager_refund, booking: booking, status: 'cancelled', amount: Money.new(490)) }

          describe 'with cancellation options' do
            let!(:cancellation_option) { create(:booking_cancellation_option, event: booking.event, penalty_price: Money.new(10)) }
            include_examples :success_with_cancellation_option, cancelled_once: true
          end

          describe 'without cancellation options' do
            let!(:refund) { create(:manager_refund, booking: booking, status: 'cancelled', amount: Money.new(500)) }
            include_examples :success, cancelled_once: true, amount: 500
          end
        end
      end
    end

    describe 'cancelled booking' do
      let(:booking) { create(:cancelled_booking) }
      let(:current_user) { booking.user }

      include_examples :fail, errors: ['Booking was cancelled']
    end
  end
end
