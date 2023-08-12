# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsMutations::CancelBooking do
  let(:default_time) { Time.zone.now.at_beginning_of_hour }
  let(:mutation) do
    "
      mutation CancelBooking($input: CancelBooking!) {
        cancelBooking(input: $input) {
          booking {
            status
          }
          refunds {
            status
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
                                                            .and change { Notification.firm_refund_created.delivery_method_email.count }.by(1)
                                                            .and change { Notification.trip_refund_created.delivery_method_email.count }.by(1)
                                                            .and change { Refund.count }.by(0)
                                                            .and change { Penalty.count }.by(0)

        expect(result.dig(:data, :cancelBooking, :booking, :status)).to eq('cancelled')
        expect(result.dig(:data, :cancelBooking, :booking, :refund)).to be_nil
        expect(result.dig(:data, :cancelBooking, :booking, :penalty)).to be_nil
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
          expect(result.dig(:data, :cancelBooking, :booking, :penalty, :amount, :cents)).to eq(1000)
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
      context 'not paid booking' do
        describe 'success' do
          include_examples :not_paid_success
        end

        describe 'fail' do
          include_examples :not_paid_fail
        end
      end

      context 'deposit paid' do
        describe 'success' do
          include_examples :success
        end

        describe 'fail' do
          include_examples :fail
        end
      end

      context 'partially paid' do
        describe 'success' do
          include_examples :success
        end

        describe 'fail' do
          include_examples :fail
        end
      end

      context 'fully paid' do
        describe 'success' do
          include_examples :success
        end

        describe 'fail' do
          include_examples :fail
        end
      end
    end

    describe 'cancelled booking' do
      describe 'fail' do
        include_examples :fail
      end
    end
  end

  describe 'as attendee' do
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
      context 'not paid booking' do
        describe 'success' do
          include_examples :not_paid_success
        end

        describe 'fail' do
          include_examples :not_paid_fail
        end
      end

      context 'deposit paid' do
        describe 'success' do
          include_examples :success
        end

        describe 'fail' do
          include_examples :fail
        end
      end

      context 'partially paid' do
        describe 'success' do
          include_examples :success
        end

        describe 'fail' do
          include_examples :fail
        end
      end

      context 'fully paid' do
        describe 'success' do
          include_examples :success
        end

        describe 'fail' do
          include_examples :fail
        end
      end
    end

    describe 'cancelled booking' do
      describe 'fail' do
        include_examples :fail
      end
    end
  end
end
