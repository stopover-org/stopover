# frozen_string_literal: true

module Mutations
  module EventsMutations
    class UnpublishEvent < BaseMutation
      manager_only

      field :event, Types::EventRelated::EventType

      argument :event_id, ID, loads: Types::EventRelated::EventType
      def resolve(event:)
        {
          event: Stopover::EventManagement::EventPublisher.new(event, current_user).unpublish
        }
      end
    end
  end
end
