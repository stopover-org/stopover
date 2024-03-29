# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class CreateStripeAccount < BaseMutation
      AUTHORIZATION_FIELD = 'current_firm'

      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::Authorizations::ManagerAuthorized

      field :setup_account_url, String

      def resolve
        stripe_connect = context[:current_user].account.current_firm.stripe_connects.create!
        account_link = Stopover::StripeAccountService.create_stripe_account(context[:current_user], stripe_connect)

        {
          setup_account_url: account_link[:account_link],
          notification: I18n.t('graphql.mutations.create_stripe_account.notifications.redirection')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          setup_account_url: nil,
          errors: [message]
        }
      end

      def authorized?(**_inputs)
        return false, { errors: [I18n.t('graphql.errors.general')] } if current_firm&.stripe_connects&.active&.any?

        super
      end
    end
  end
end
