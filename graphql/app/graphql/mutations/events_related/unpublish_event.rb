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
          notification: 'Event unpublished!'
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
        return false, { errors: ['Event wasn\'t verified yet'] } if event.draft?
        return false, { errors: ['Event wasn\'t published yet'] } if event.unpublished?

        super
      end
    end
  end
end
