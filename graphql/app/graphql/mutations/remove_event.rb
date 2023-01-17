# frozen_string_literal: true

module Mutations
  class RemoveEvent < BaseMutation
    field :event, Types::EventType

    def resolve(event_id)
      {
        event: RemoveEventJob.perform_later(event_id)
      }
    end
  end
end
