# frozen_string_literal: true

module Mutations
  module EventsRelated
    class UnpublishEvent < BaseMutation
      AUTHORIZATION_FIELD = 'event'

      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::EventsRelated::Authorizations::ActiveEventAuthorized
      include Mutations::Authorizations::ManagerAuthorized

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
          errors: [message]
        }
      end
    end
  end
end
