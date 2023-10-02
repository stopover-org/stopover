# frozen_string_literal: true

module Stopover
  module BookingManagement
    class CurrentCancellation
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def perform
        current_cancellation_option
      end

      def terms
        return I18n.t('graphql.mutations.cancel_booking.terms.cancellation_not_paid') if @booking.already_paid_price.zero?

        cancellation_option = current_cancellation_option
        if cancellation_option
          I18n.t('graphql.mutations.cancel_booking.terms.cancellation_with_penalty',
                 penalty: cancellation_option.penalty_price.format,
                 refund: (@booking.already_paid_price - cancellation_option.penalty_price).format)
        else
          I18n.t('graphql.mutations.cancel_booking.terms.cancellation_without_penalty')
        end
      end

      def current_cancellation_option
        return nil if include_penalty?

        time_diff = (@booking.schedule.scheduled_for - Time.current) / 3600

        @booking.event.booking_cancellation_options.active.where('deadline > :time_diff', time_diff: time_diff).order(deadline: :asc).last
      end

      def include_penalty?
        @current_user.account.current_firm == @booking.firm
      end
    end
  end
end
