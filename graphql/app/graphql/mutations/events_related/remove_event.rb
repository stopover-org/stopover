# frozen_string_literal: true

module Mutations
  module EventsRelated
    class RemoveEvent < BaseMutation
      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:)
        {
          event: Stopover::EventManagement::EventDestroyer.new(event, context[:current_user]).perform,
          notification: I18n.t('graphql.mutations.remove_event.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          event: nil,
          errors: [message]
        }
      end

      private

      def authorized?(**inputs)
        event = inputs[:event]

        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_firm
        return false, { errors: [I18n.t('graphql.errors.event_removed')] } if event.removed?

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
