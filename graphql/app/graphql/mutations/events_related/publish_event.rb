# frozen_string_literal: true

module Mutations
  module EventsRelated
    class PublishEvent < BaseMutation
      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType
      def resolve(event:)
        publisher = Stopover::EventManagement::EventPublisher.new(event, context[:current_user])

        {
          event: publisher.publish
        }
      end
    end
  end
end
