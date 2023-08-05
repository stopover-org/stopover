# frozen_string_literal: true

module Mutations
  module EventsMutations
    class SyncStripe < BaseMutation
      service_user_only
      authorize -> { 'Stripe is not available payment method' unless current_firm.payment_types.include?('stripe') }

      field :event, Types::EventType

      argument :event_id, ID, loads: Types::EventType

      def resolve(event:)
        Stopover::StripeIntegrator.sync(event)

        event.event_options.each do |event_option|
          Stopover::StripeIntegrator.sync(event_option)
        end

        {
          event: event
        }
      end
    end
  end
end
