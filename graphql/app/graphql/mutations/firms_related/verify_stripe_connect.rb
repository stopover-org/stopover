# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class VerifyStripeConnect < BaseMutation
      AUTHORIZATION_FIELD = 'current_firm'

      include Mutations::FirmsRelated::Authorizations::FirmAuthorized
      include Mutations::Authorizations::ServiceUserAuthorized
      include Mutations::Authorizations::ManagerAuthorized

      field :stripe_connect, Types::FirmsRelated::StripeConnectType

      argument :stripe_connect_id, ID, loads: Types::FirmsRelated::StripeConnectType

      def resolve(stripe_connect:)
        stripe_connect.activate!

        { stripe_connect: stripe_connect,
          notification: I18n.t('graphql.mutations.verify_stripe_connect.notifications.success') }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          stripe_connect: nil,
          errors: [message]
        }
      end
    end
  end
end
