# frozen_string_literal: true

module Mutations
  class VerifyEvent < BaseMutation
    field :event, Types::EventType

    argument :event_id, ID, loads: Types::EventType

    def resolve(event:, **_args)
      raise GraphQL::ExecutionError, "You don't have rights to do it" unless context[:current_user].service_user
      event.unpublish!

      {
        event: event
      }
    end
  end
end
