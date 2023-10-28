# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class RemoveFirm < BaseMutation
      field :firm, Types::FirmsRelated::FirmType

      def resolve(**_args)
        firm = context[:current_user].account.current_firm
        firm.remove!
        notify
        {
          firm: firm.reload,
          notification: I18n.t('graphql.mutations.remove_firm.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        { errors: [message], firm: nil }
      end

      def authorized?(**inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_firm
        return false, { errors: [I18n.t('graphql.errors.firm_removed')] } if current_firm.removed?

        super
      end

      private

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: current_firm.primary_email,
          subject: 'Your firm removed',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/',
            locals: {
              title: current_firm.title,
              text: 'Your firm was removed'
            }
          )
        )
      end
    end
  end
end
