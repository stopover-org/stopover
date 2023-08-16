# frozen_string_literal: true

module Mutations
  module EventsRelated
    class UnpublishEvent < BaseMutation
      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType
      def resolve(event:)
        publisher = Stopover::EventManagement::EventPublisher.new(event, context[:current_user])

        {
          event: publisher.unpublish
        }
      end
    end
  end
end
