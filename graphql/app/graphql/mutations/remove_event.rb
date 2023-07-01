# frozen_string_literal: true

module Mutations
  class RemoveEvent < BaseMutation
    field :event, Types::EventType

    argument :event_id, ID, loads: Types::EventType

    def resolve(event:)
      {
        event: Stopover::EventManagement::EventDestroyer.new(event, context[:current_user]).perform
      }
    end
  end
end
