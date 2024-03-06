# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class PopulateDummy < BaseMutation
      AUTHORIZATION_FIELD = 'current_firm'

      include Mutations::Authorizations::ServiceUserAuthorized
      include Mutations::FirmsRelated::Authorizations::OnboardingFirmAuthorized

      field :firm, Types::FirmsRelated::FirmType

      def resolve
        FirmManagement::PopulateDummyFirmJob.perform_later(current_firm.id)

        { firm: current_firm,
          notification: I18n.t('graphql.mutations.populate_dummy.notifications.success') }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        { errors: [message], firm: nil, account: current_account }
      end
    end
  end
end
