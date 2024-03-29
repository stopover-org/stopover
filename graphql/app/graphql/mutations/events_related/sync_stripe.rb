# frozen_string_literal: true

module Mutations
  module EventsRelated
    class SyncStripe < BaseMutation
      AUTHORIZATION_FIELD = 'event'

      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::EventsRelated::Authorizations::ActiveEventAuthorized
      include Mutations::Authorizations::ManagerAuthorized

      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:)
        Stopover::StripeIntegrator.sync(event)

        event.event_options.each do |event_option|
          Stopover::StripeIntegrator.sync(event_option)
        end

        {
          event: event,
          notification: I18n.t('graphql.mutations.sync_stripe.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          event: nil,
          errors: [message]
        }
      end

      private

      def authorized?(**inputs)
        event = inputs[:event]

        return false, { errors: [I18n.t('graphql.errors.stripe_payment_method_required')] } unless event.firm.payment_types.include?('stripe')

        super
      end
    end
  end
end
