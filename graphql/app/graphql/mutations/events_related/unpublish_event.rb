# frozen_string_literal: true

module Mutations
  module EventsRelated
    class UnpublishEvent < BaseMutation
      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType
      def resolve(event:)
        publisher = Stopover::EventManagement::EventPublisher.new(event, context[:current_user])

        {
          event: publisher.unpublish,
          notification: I18n.t('graphql.mutations.unpublish_event.notifications.success')
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
        return false, { errors: [I18n.t('graphql.errors.general')] } if event.unpublished?

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
