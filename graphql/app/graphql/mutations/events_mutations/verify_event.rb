# frozen_string_literal: true

module Mutations
  module EventsMutations
    class VerifyEvent < BaseMutation
      service_user_only

      field :event, Types::EventType

      argument :event_id, ID, loads: Types::EventType

      def resolve(event:, **_args)
        event.unpublish!

        {
          event: event
        }
      end
    end
  end
end
