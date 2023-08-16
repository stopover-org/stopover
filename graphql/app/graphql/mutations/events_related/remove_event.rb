# frozen_string_literal: true

module Mutations
  module EventsRelated
    class RemoveEvent < BaseMutation
      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:)
        {
          event: Stopover::EventManagement::EventDestroyer.new(event, context[:current_user]).perform
        }
      end
    end
  end
end
