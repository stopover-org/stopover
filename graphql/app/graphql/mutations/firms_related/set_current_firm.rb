# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class SetCurrentFirm < BaseMutation
      field :firm, Types::FirmsRelated::FirmType
      field :account, Types::UsersRelated::AccountType

      argument :firm_id, ID, loads: Types::FirmsRelated::FirmType

      def resolve(firm:)
        current_account.update!(firm: firm)

        { firm: firm,
            account: current_account,
              notification: I18n.t('graphql.mutations.set_current_firm.notifications.success') }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        { errors: [message], firm: nil, account: current_account }
      end

      def authorized?(**inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user.service_user
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_account.firms.include?(inputs[:firm])

        super
      end
    end
  end
end
