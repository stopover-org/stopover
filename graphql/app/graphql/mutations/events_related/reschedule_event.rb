# frozen_string_literal: true

module Mutations
  module EventsRelated
    class RescheduleEvent < BaseMutation
      AUTHORIZATION_FIELD = 'event'

      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::EventsRelated::Authorizations::ActiveEventAuthorized
      include Mutations::Authorizations::ManagerAuthorized

      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:)
        {
          event: Stopover::EventManagement::EventRescheduler.new(event, context[:current_user]).perform,
          notification: I18n.t('graphql.mutations.reschedule_event.notifications.success')
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
