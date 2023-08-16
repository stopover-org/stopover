# frozen_string_literal: true

module Mutations
  module EventsRelated
    class SyncStripe < BaseMutation
      field :event, Types::EventType

      argument :event_id, ID, loads: Types::EventType

      def resolve(event:)
        raise GraphQL::ExecutionError, 'Stripe is not available payment method' unless event.firm.payment_types.include?('stripe')
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
