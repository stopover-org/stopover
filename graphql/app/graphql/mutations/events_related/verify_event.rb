# frozen_string_literal: true

module Mutations
  module EventsRelated
    class VerifyEvent < BaseMutation
      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:, **_args)
        raise GraphQL::ExecutionError, "You don't have rights to do it" unless context[:current_user].service_user
        event.unpublish!

        {
          event: event,
          notification: 'Event verified!'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          event: nil,
          errors: [e.message]
        }
      end

      private

      def authorized?(**inputs)
        event = inputs[:event]

        return false, { errors: ['You are not authorized'] } unless service_user?
        return false, { errors: ['You are not authorized'] } unless manager?(event)
        return false, { errors: ['Firm is not verified'] } if current_firm.pending?
        return false, { errors: ['Event removed'] } if event.removed?
        return false, { errors: ['Event was verified already'] } unless event.draft?

        super
      end
    end
  end
end
