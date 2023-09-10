# frozen_string_literal: true

module Mutations
  module EventsRelated
    class SyncStripe < BaseMutation
      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:)
        Stopover::StripeIntegrator.sync(event)

        event.event_options.each do |event_option|
          Stopover::StripeIntegrator.sync(event_option)
        end

        {
          event: event,
          notification: 'Event sync in progress!'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          booking: nil,
          errors: [e.message]
        }
      end

      private

      def authorized?(**inputs)
        event = inputs[:event]

        return false, { errors: ['You are not authorized'] } unless current_firm
        return false, { errors: ['Event is removed already'] } if event.removed?
        return false, { errors: ['Event wasn\'t verified yet'] } if event.draft?
        return false, { errors: ['Stripe is not available payment method'] } unless event.firm.payment_types.include?('stripe')

        super
      end
    end
  end
end
