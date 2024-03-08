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

      included do
        def self.searchkick_mappings
          {
            properties: {
              payment_type: { type: 'keyword' },
              provider: { type: 'keyword' },
              status: { type: 'keyword' },
              total_price_cents: { type: 'integer' },
              booking_id: { type: 'integer' },
              firm_id: { type: 'integer' },
              payment_intent_id: { type: 'keyword' },
              stripe_checkout_session_id: { type: 'keyword' }
            }
          }
        end
      end
    end
  end
end
