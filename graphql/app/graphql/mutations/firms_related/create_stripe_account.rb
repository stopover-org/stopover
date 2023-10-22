# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class CreateStripeAccount < BaseMutation
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
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user&.active?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_firm
        return false, { errors: [I18n.t('graphql.errors.general')] } if current_firm.stripe_connects.active.any?

        super
      end

      private

      def oncreate_notify
        Notification.create!(
          delivery_method: 'email',
          to: 'info@glidequesttours.cz',
          subject: '',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/firm_creation',
            locals: {
              title: 'my title',
              text: 'stripe account created'
            }
          )
        )
      end
    end
  end
end
