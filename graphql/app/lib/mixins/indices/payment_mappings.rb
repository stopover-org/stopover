# frozen_string_literal: true

module Mixins
  module Indices
    module PaymentMappings
      extend ActiveSupport::Concern

      def search_data
        {
          payment_type: payment_type,
          provider: provider,
          status: status,
          total_price_cents: total_price_cents,
          booking_id: booking_id,
          firm_id: firm_id,
          payment_intent_id: payment_intent_id,
          stripe_checkout_session_id: stripe_checkout_session_id
        }
      end
    end
  end
end
