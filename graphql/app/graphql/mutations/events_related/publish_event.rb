# frozen_string_literal: true

module Mutations
  module EventsRelated
    class PublishEvent < BaseMutation
      AUTHORIZATION_FIELD = 'event'

      include Mutations::Authorizations::ManagerAuthorized
      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::EventsRelated::Authorizations::ActiveEventAuthorized

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

      def authorized?(**inputs)
        event = authorization_field(inputs)

        return false, { errors: [I18n.t('graphql.errors.event_published')] } if event.published?

        super
      end
    end
  end
end
