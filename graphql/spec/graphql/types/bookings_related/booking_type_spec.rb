# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::BookingsRelated::BookingType, type: :graphql_type do
  let(:variables) { { bookingId: GraphqlSchema.id_from_object(booking) } }
  let(:booking) { create(:booking) }
  let(:current_user) { booking.trip.account.user }
  subject do
    GraphqlSchema.execute(query,
                          variables: variables,
                          context: { current_user: current_user }).to_h.deep_symbolize_keys
  end

  context 'available fields' do
    let(:query) do
      <<-GRAPHQL
        query {
          __type(name:"Booking") {
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
                                                            name: 'account'
                                                          },
                                                          {
                                                            name: 'alreadyPaidPrice'
                                                          },
                                                          {
                                                            name: 'attendeeTotalPrice'
                                                          },
                                                          {
                                                            name: 'attendees'
                                                          },
                                                          {
                                                            name: 'bookedFor'
                                                          },
                                                          {
                                                            name: 'bookingOptions'
                                                          },
                                                          {
                                                            name: 'cancellationTerms'
                                                          },
                                                          {
                                                            name: 'contactEmail'
                                                          },
                                                          {
                                                            name: 'contactPhone'
                                                          },
                                                          {
                                                            name: 'event'
                                                          },
                                                          {
                                                            name: 'eventOptions'
                                                          },
                                                          {
                                                            name: 'id'
                                                          },
                                                          {
                                                            name: 'leftToPayDepositPrice'
                                                          },
                                                          {
                                                            name: 'leftToPayPrice'
                                                          },
                                                          {
                                                            name: 'organizerTotalPrice'
                                                          },
                                                          {
                                                            name: 'paymentType'
                                                          },
                                                          {
                                                            name: 'payments'
                                                          },
                                                          {
                                                            name: 'possiblePenaltyAmount'
                                                          },
                                                          {
                                                            name: 'possibleRefundAmount'
                                                          },
                                                          {
                                                            name: 'refunds'
                                                          },
                                                          {
                                                            name: 'schedule'
                                                          },
                                                          {
                                                            name: 'status'
                                                          },
                                                          {
                                                            name: 'trip'
                                                          }
                                                        ])
    end
  end

  context 'common fields' do
    context 'booked_for' do
      let(:query) do
        <<-GRAPHQL
          query($bookingId: ID!) {
            booking(id: $bookingId) {
              bookedFor
              schedule {
                scheduledFor
              }
            }
          }
        GRAPHQL
      end

      it 'should be equal to scheduledFor' do
        result = subject

        expect(result.dig(:data, :booking, :bookedFor).to_datetime).to eq(booking.schedule.scheduled_for)
        expect(result.dig(:data, :booking, :schedule, :scheduledFor).to_datetime).to eq(booking.schedule.scheduled_for)
      end
    end

    context 'payments' do
      let!(:booking) { create(:fully_paid_booking) }
      let(:current_user) { booking.trip.account.user }
      let(:query) do
        <<-GRAPHQL
          query($bookingId: ID!) {
            booking(id: $bookingId) {
              payments {
                edges {
                  node {
                    id
                  }
                }
                total
              }
            }
          }
        GRAPHQL
      end

      before do
        Payment.reindex_test
      end

      it 'should include payments' do
        result = subject

        expect(booking.payments.count).to eq(2)
        expect(result.dig(:data, :booking, :payments, :edges).count).to eq(2)
        expect(result.dig(:data, :booking, :payments, :total)).to eq(2)
      end
    end

    context 'refunds' do
      let!(:booking) { create(:fully_paid_booking) }
      let(:current_user) { booking.trip.account.user }
      let(:query) do
        <<-GRAPHQL
          query($bookingId: ID!) {
            booking(id: $bookingId) {
              refunds {
                edges {
                  node {
                    id
                  }
                }
                total
              }
            }
          }
        GRAPHQL
      end

      before do
        Stopover::RefundManagement::RefundCreator.new(booking, current_user).perform
        Refund.reindex_test
      end

      it 'include only parent refunds' do
        result = subject

        expect(booking.refunds.count).to eq(3)
        expect(booking.refunds.where(refund_id: nil).count).to eq(1)
        expect(result.dig(:data, :booking, :refunds, :edges).count).to eq(1)
        expect(result.dig(:data, :booking, :refunds, :total)).to eq(1)
        expect(result.dig(:data, :booking, :refunds, :edges, 0, :node, :id)).to eq(GraphqlSchema.id_from_object(booking.refunds.find_by(refund_id: nil)))
      end
    end

    context 'attendees' do
      let!(:booking) { create(:booking) }
      let(:current_user) { booking.trip.account.user }
      let(:query) do
        <<-GRAPHQL
          query($bookingId: ID!) {
            booking(id: $bookingId) {
              attendees {
                id
              }
            }
          }
        GRAPHQL
      end

      before do
        create_list(:attendee, 10, booking: booking)
      end

      it 'include all attendees' do
        result = subject

        expect(booking.attendees.count).to eq(11)
        expect(result.dig(:data, :booking, :attendees).count).to eq(11)
      end
    end

    context 'cancellation terms' do
      let(:current_user) { booking.trip.account.user }
      let(:query) do
        <<-GRAPHQL
          query($bookingId: ID!) {
            booking(id: $bookingId) {
              cancellationTerms
            }
          }
        GRAPHQL
      end
      context 'without booking cancellation options' do
        it 'check cancellation options' do
          expect(booking.event.booking_cancellation_options.count).to eq(0)
        end

        context 'for fully paid booking' do
          let!(:booking) { create(:fully_paid_booking) }

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(0)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :cancellationTerms)).to eq('Booking will be fully refunded')
          end
        end

        context 'for partially paid booking' do
          let!(:booking) { create(:partially_paid_booking) }

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(0)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :cancellationTerms)).to eq('Booking will be fully refunded')
          end
        end

        context 'for not paid booking' do
          let!(:booking) { create(:booking) }

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(0)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :cancellationTerms)).to eq('Booking will be cancelled without refunds')
          end
        end
      end

      context 'with booking cancellation options' do
        context 'for fully paid booking' do
          let!(:booking) { create(:fully_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 2.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :cancellationTerms)).to eq('Cancellation will result $0.10 penalty. $5.40 will be refunded')
          end
        end

        context 'for partially paid booking' do
          let!(:booking) { create(:partially_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 2.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :cancellationTerms)).to eq('Cancellation will result $0.10 penalty. $3.56 will be refunded')
          end
        end

        context 'for not paid booking' do
          let!(:booking) { create(:booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 2.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :cancellationTerms)).to eq('Booking will be cancelled without refunds')
          end
        end
      end

      context 'with future booking cancellation options' do
        context 'for fully paid booking' do
          let!(:booking) { create(:fully_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 36.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :cancellationTerms)).to eq('Booking will be fully refunded')
          end
        end

        context 'for partially paid booking' do
          let!(:booking) { create(:partially_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 36.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :cancellationTerms)).to eq('Booking will be fully refunded')
          end
        end

        context 'for not paid booking' do
          let!(:booking) { create(:booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 36.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :cancellationTerms)).to eq('Booking will be cancelled without refunds')
          end
        end
      end
    end

    context 'possible refund amount' do
      let(:current_user) { booking.trip.account.user }
      let(:query) do
        <<-GRAPHQL
          query($bookingId: ID!) {
            booking(id: $bookingId) {
              possibleRefundAmount {
                cents
              }
            }
          }
        GRAPHQL
      end
      context 'without booking cancellation options' do
        it 'check cancellation options' do
          expect(booking.event.booking_cancellation_options.count).to eq(0)
        end

        context 'for fully paid booking' do
          let!(:booking) { create(:fully_paid_booking) }

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(0)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possibleRefundAmount, :cents)).to eq(550)
          end
        end

        context 'for partially paid booking' do
          let!(:booking) { create(:partially_paid_booking) }

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(0)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possibleRefundAmount, :cents)).to eq(366)
          end
        end

        context 'for not paid booking' do
          let!(:booking) { create(:booking) }

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(0)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possibleRefundAmount, :cents)).to eq(0)
          end
        end
      end

      context 'with booking cancellation options' do
        context 'for fully paid booking' do
          let!(:booking) { create(:fully_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 2.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possibleRefundAmount, :cents)).to eq(540)
          end
        end

        context 'for partially paid booking' do
          let!(:booking) { create(:partially_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 2.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possibleRefundAmount, :cents)).to eq(356)
          end
        end

        context 'for not paid booking' do
          let!(:booking) { create(:booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 2.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possibleRefundAmount, :cents)).to eq(0)
          end
        end
      end

      context 'with future booking cancellation options' do
        context 'for fully paid booking' do
          let!(:booking) { create(:fully_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 36.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possibleRefundAmount, :cents)).to eq(550)
          end
        end

        context 'for partially paid booking' do
          let!(:booking) { create(:partially_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 36.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possibleRefundAmount, :cents)).to eq(366)
          end
        end

        context 'for not paid booking' do
          let!(:booking) { create(:booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 36.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possibleRefundAmount, :cents)).to eq(0)
          end
        end
      end
    end

    context 'possible penalty amount' do
      let(:current_user) { booking.trip.account.user }
      let(:query) do
        <<-GRAPHQL
          query($bookingId: ID!) {
            booking(id: $bookingId) {
              possiblePenaltyAmount {
                cents
              }
            }
          }
        GRAPHQL
      end
      context 'without booking cancellation options' do
        it 'check cancellation options' do
          expect(booking.event.booking_cancellation_options.count).to eq(0)
        end

        context 'for fully paid booking' do
          let!(:booking) { create(:fully_paid_booking) }

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(0)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possiblePenaltyAmount, :cents)).to eq(0)
          end
        end

        context 'for partially paid booking' do
          let!(:booking) { create(:partially_paid_booking) }

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(0)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possiblePenaltyAmount, :cents)).to eq(0)
          end
        end

        context 'for not paid booking' do
          let!(:booking) { create(:booking) }

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(0)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possiblePenaltyAmount, :cents)).to eq(0)
          end
        end
      end

      context 'with booking cancellation options' do
        context 'for fully paid booking' do
          let!(:booking) { create(:fully_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 2.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possiblePenaltyAmount, :cents)).to eq(10)
          end
        end

        context 'for partially paid booking' do
          let!(:booking) { create(:partially_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 2.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possiblePenaltyAmount, :cents)).to eq(10)
          end
        end

        context 'for not paid booking' do
          let!(:booking) { create(:booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 2.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possiblePenaltyAmount, :cents)).to eq(0)
          end
        end
      end

      context 'with future booking cancellation options' do
        context 'for fully paid booking' do
          let!(:booking) { create(:fully_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 36.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possiblePenaltyAmount, :cents)).to eq(0)
          end
        end

        context 'for partially paid booking' do
          let!(:booking) { create(:partially_paid_booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 36.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possiblePenaltyAmount, :cents)).to eq(0)
          end
        end

        context 'for not paid booking' do
          let!(:booking) { create(:booking) }
          let!(:booking_cancellation_option) { create(:booking_cancellation_option, event: booking.event) }

          before do
            booking.schedule.update(scheduled_for: 36.hours.from_now)
          end

          it 'check cancellation options' do
            expect(booking.event.booking_cancellation_options.count).to eq(1)
          end

          it 'success' do
            result = subject

            expect(result.dig(:data, :booking, :possiblePenaltyAmount, :cents)).to eq(0)
          end
        end
      end
    end
  end
end
