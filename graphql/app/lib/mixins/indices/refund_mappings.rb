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

      included do
        def self.searchkick_mappings
          {
            properties: {
              penalty_amount_cents: { type: 'integer' },
              refund_amount_cents: { type: 'integer' },
              status: { type: 'keyword' },
              booking_cancellation_option_id: { type: 'integer' },
              booking_id: { type: 'integer' },
              firm_id: { type: 'integer' },
              payment_id: { type: 'integer' },
              refund_id: { type: 'integer' },
              stripe_refund_id: { type: 'keyword' }
            }
          }
        end
      end
    end
  end
end
