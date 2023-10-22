# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class VerifyStripeConnect < BaseMutation
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

      def authorized?(**_inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user&.active?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user&.service_user
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_firm
        return false, { errors: [I18n.t('graphql.errors.general')] } if current_firm.stripe_connects.active.any?

        super
      end

      private

      def oncreate_notify
        Notification.create!(
          delivery_method: 'email',
          to: current_firm.primary_email,
          subject: '',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/',
            locals: {
              title: current_firm.title,
              text: 'You were connected to stripe'
            }
          )
        )
      end
    end
  end
end
