# frozen_string_literal: true

module Mutations
  module EventsRelated
    class VerifyEvent < BaseMutation
      AUTHORIZATION_FIELD = 'event'

      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::EventsRelated::Authorizations::EventAuthorized
      include Mutations::Authorizations::ServiceUserAuthorized
      include Mutations::Authorizations::ManagerAuthorized

      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:, **_args)
        event.unpublish!

        {
          event: event,
          notification: I18n.t('graphql.mutations.verify_event.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          event: nil,
          errors: [e.message]
        }
      end

      def authorized?(**inputs)
        event = authorization_field(inputs)

        return false, { errors: [I18n.t('graphql.errors.general')] } if event.published?
        return false, { errors: [I18n.t('graphql.errors.general')] } if event.unpublished?

        super
      end
    end
  end
end
