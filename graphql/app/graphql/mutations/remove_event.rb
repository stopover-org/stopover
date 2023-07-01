# frozen_string_literal: true

module Mutations
  class RemoveEvent < BaseMutation
    field :event, Types::EventType

    argument :event_id, ID, loads: Types::EventType

    def resolve(event:)
      RemoveEventJob.perform_later(event.id)

      {
        event: event
      }
    end
  end
end
