# frozen_string_literal: true

module Mutations
  class UnpublishEvent < BaseMutation
    field :event, Types::EventType

    argument :event_id, ID, loads: Types::EventType
    def resolve(event:)
      publisher = Stopover::EventManagement::EventPublisher.new(event, context[:current_user])

      {
        event: publisher.unpublish
      }
    end
  end
end
