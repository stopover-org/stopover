# frozen_string_literal: true

module Mixins
  module Indices
    module RefundMappings
      extend ActiveSupport::Concern

      def search_data
        {
          penalty_amount_cents: penalty_amount_cents,
          refund_amount_cents: refund_amount_cents,
          status: status,
          booking_cancellation_option_id: booking_cancellation_option_id,
          booking_id: booking_id,
          firm_id: firm_id,
          payment_id: payment_id,
          refund_id: refund_id,
          stripe_refund_id: stripe_refund_id
        }
      end
    end
  end
end
