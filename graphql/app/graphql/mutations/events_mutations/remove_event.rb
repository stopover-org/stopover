# frozen_string_literal: true

module Mutations
  module EventsMutations
    class RemoveEvent < BaseMutation
      manager_only

      field :event, Types::EventRelated::EventType

      argument :event_id, ID, loads: Types::EventRelated::EventType

      def resolve(event:)
        {
          event: Stopover::EventManagement::EventDestroyer.new(event, current_user).perform
        }
      end
    end
  end
end
