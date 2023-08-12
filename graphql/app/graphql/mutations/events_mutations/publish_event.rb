# frozen_string_literal: true

module Mutations
  module EventsMutations
    class PublishEvent < BaseMutation
      manager_only

      field :event, Types::EventRelated::EventType

      argument :event_id, ID, loads: Types::EventRelated::EventType
      def resolve(event:)
        {
          event: Stopover::EventManagement::EventPublisher.new(event, current_user).publish
        }
      end
    end
  end
end
