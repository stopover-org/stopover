# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class VerifyFirm < BaseMutation
      field :firm, Types::FirmsRelated::FirmType

      def resolve(**_args)
        current_firm.activate!
        notify
        {
          firm: current_firm,
          notification: I18n.t('graphql.mutations.verify_firm.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        { errors: [message], firm: nil }
      end

      def authorized?(**inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user&.active?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless service_user?
        return false, { errors: [I18n.t('graphql.errors.general')] } if current_firm&.active?

        super
      end

      private

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: current_firm.primary_email,
          subject: 'Firm verification',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/',
            locals: {
              title: current_firm.title,
              text: 'Your firm was verified'
            }
          )
        )
      end
    end
  end
end
