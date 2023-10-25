# frozen_string_literal: true

module Mutations
  module EventsRelated
    class SyncStripe < BaseMutation
      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:)
        Stopover::StripeIntegrator.sync(event)

        event.event_options.each do |event_option|
          Stopover::StripeIntegrator.sync(event_option)
        end

        {
          event: event,
          notification: I18n.t('graphql.mutations.sync_stripe.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          event: nil,
          errors: [e.message]
        }
      end

      private

      def authorized?(**inputs)
        event = inputs[:event]

        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_firm
        return false, { errors: [I18n.t('graphql.errors.event_removed')] } if event.removed?
        return false, { errors: [I18n.t('graphql.errors.event_not_verified')] } if event.draft?
        return false, { errors: [I18n.t('graphql.errors.stripe_payment_method_required')] } unless event.firm.payment_types.include?('stripe')

        super
      end

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: current_firm.primary_email,
          subject: '',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/',
            locals: {
              title: current_firm.title,
              text: ''
            }
          )
        )
      end
    end
  end
end
