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
          notification: 'Event published!'
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
        return false, { errors: ['Firm is not verified'] } if current_firm.pending?
        return false, { errors: ['Event is not verified'] } if event.draft?
        return false, { errors: ['Event published already'] } if event.published?
        return false, { errors: ['Event removed'] } if event.removed?

        super
      end
    end
  end
end
