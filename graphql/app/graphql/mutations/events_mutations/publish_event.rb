# frozen_string_literal: true

module Mutations
  module EventsMutations
    class PublishEvent < BaseMutation
      manager_only

      field :event, Types::EventType

      argument :event_id, ID, loads: Types::EventType
      def resolve(event:)
        publisher = Stopover::EventManagement::EventPublisher.new(event, context[:current_user])

        {
          event: publisher.publish
        }
      end
    end
  end
end
