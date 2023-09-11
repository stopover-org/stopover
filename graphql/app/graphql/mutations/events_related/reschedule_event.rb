# frozen_string_literal: true

module Mutations
  module EventsRelated
    class RescheduleEvent < BaseMutation
      field :event, Types::EventsRelated::EventType
      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:)
        {
          event: Stopover::EventManagement::EventRescheduler.new(event, context[:current_user]).perform,
          notification: 'Event rescheduled!'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          booking: nil,
          errors: [e.message]
        }
      end

      private

      def authorized?(**inputs)
        event = inputs[:event]

        return false, { errors: ['You are not authorized'] } unless current_firm
        return false, { errors: ['Event is removed already'] } if event.removed?
        return false, { errors: ['Event wasn\'t verified yet'] } if event.draft?

        super
      end
    end
  end
end
