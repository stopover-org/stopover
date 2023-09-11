# frozen_string_literal: true

module Mutations
  module EventsRelated
    class RemoveEvent < BaseMutation
      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:)
        {
          event: Stopover::EventManagement::EventDestroyer.new(event, context[:current_user]).perform,
          notification: 'Event removed!'
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

        return false, { errors: ['You are not authorized'] } unless current_firm
        return false, { errors: ['Event is removed already'] } if event.removed?

        super
      end
    end
  end
end
