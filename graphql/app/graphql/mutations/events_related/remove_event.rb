# frozen_string_literal: true

module Mutations
  module EventsRelated
    class RemoveEvent < BaseMutation
      AUTHORIZATION_FIELD = 'event'

      include Mutations::Authorizations::ManagerAuthorized
      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::EventsRelated::Authorizations::EventAuthorized

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
    end
  end
end
