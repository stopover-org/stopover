# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class RemoveFirm < BaseMutation
      AUTHORIZATION_FIELD = 'current_firm'

      include Mutations::FirmsRelated::Authorizations::FirmAuthorized
      include Mutations::Authorizations::ManagerAuthorized

      field :firm, Types::FirmsRelated::FirmType

      def resolve(**_args)
        firm = context[:current_user].account.current_firm
        firm.remove!

        {
          firm: firm.reload,
          notification: I18n.t('graphql.mutations.remove_firm.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        { errors: [message], firm: nil }
      end
    end
  end
end
