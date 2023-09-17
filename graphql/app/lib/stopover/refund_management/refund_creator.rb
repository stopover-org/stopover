# frozen_string_literal: true

module Stopover
  module RefundManagement
    class RefundCreator
      def initialize(booking, current_user, parent_refund = nil)
        @booking = booking
        @current_user = current_user
        @parent_refund = parent_refund

        @current_cancellation_service = Stopover::BookingManagement::CurrentCancellation.new(@booking, @current_user)
      end

      def perform
        refund = calculate_refund
        penalty = calculate_penalty

        if refund.positive?
          @parent_refund ||= @booking.refunds.build(penalty_amount: penalty,
                                                    refund_amount: refund,
                                                    booking: @booking,
                                                    account: @current_user.account,
                                                    booking_cancellation_option: @current_cancellation_service.perform)

          generate_related_refunds

          @parent_refund.save!
        end

        @parent_refund
      end

      def generate_related_refunds
        penalty_left = @parent_refund.penalty_amount
        refund_left = @parent_refund.refund_amount
        @booking.payments.successful.each do |payment|
          next if payment.balance_amount.zero? || (penalty_left.zero? && refund_left.zero?)
          payment_penalty = Money.new(0)
          payment_refund = Money.new(0)

          if payment.balance_amount > penalty_left
            payment_penalty = penalty_left

            possible_refund = payment.balance_amount - penalty_left

            payment_refund = if possible_refund > refund_left
                               refund_left
                             elsif possible_refund.positive?
                               possible_refund
                             end
          else
            payment_penalty = payment.balance_amount
          end

          penalty_left -= payment_penalty
          refund_left -= payment_refund

          @parent_refund.related_refunds.build(penalty_amount: payment_penalty,
                                               refund_amount: payment_refund,
                                               firm: @parent_refund.firm,
                                               booking: @booking,
                                               payment: payment,
                                               account: @current_user.account)
        end

        @parent_refund.process!

        @parent_refund.related_refunds.each do |child_refund|
          execute_refund(child_refund)
        end
      end

      def calculate_refund
        return Money.new(0) if @booking.already_paid_price.zero?

        @booking.already_paid_price - calculate_penalty
      end

      def calculate_penalty
        return Money.new(0) if @current_cancellation_service.include_penalty?

        cancellation_option&.penalty_price || Money.new(0)
      end

      def execute_refund(child_refund)
        return unless child_refund.pending?

        child_refund.process!
        if child_refund&.payment&.payment_intent_id
          refund_id = Stripe::Refund.create({
                                              payment_intent: child_refund.payment.payment_intent_id,
                                              amount: child_refund.refund_amount.cents
                                            })
          child_refund.success!
          child_refund.update(stripe_refund_id: refund_id)
        end
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        child_refund.cancel!
      end
    end
  end
end
