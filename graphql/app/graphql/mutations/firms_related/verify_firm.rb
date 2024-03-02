# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class VerifyFirm < BaseMutation
      AUTHORIZATION_FIELD = 'current_firm'

      include Mutations::FirmsRelated::Authorizations::FirmAuthorized
      include Mutations::Authorizations::ServiceUserAuthorized
      include Mutations::Authorizations::ManagerAuthorized

      field :firm, Types::FirmsRelated::FirmType

      def resolve(**_args)
        current_firm.activate!

        {
          firm: current_firm,
          notification: I18n.t('graphql.mutations.verify_firm.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        { errors: [message], firm: nil }
      end
    end
  end
end
