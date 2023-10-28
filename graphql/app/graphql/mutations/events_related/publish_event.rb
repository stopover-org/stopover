# frozen_string_literal: true

module Mutations
  module EventsRelated
    class PublishEvent < BaseMutation
      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:)
        publisher = Stopover::EventManagement::EventPublisher.new(event, context[:current_user])

        {
          event: publisher.publish,
          notification: I18n.t('graphql.mutations.publish_event.notifications.success')
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
        return false, { errors: [I18n.t('graphql.errors.firm_not_verified')] } if current_firm.pending?
        return false, { errors: [I18n.t('graphql.errors.event_not_verified')] } if event.draft?
        return false, { errors: [I18n.t('graphql.errors.event_published')] } if event.published?
        return false, { errors: [I18n.t('graphql.errors.event_removed')] } if event.removed?

        super
      end

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: event.firm.primary_email,
          subject: 'Event published',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/event_related',
            locals: {
              title: event.title,
              text: 'Your event was published'
            }
          )
        )
      end
    end
  end
end
