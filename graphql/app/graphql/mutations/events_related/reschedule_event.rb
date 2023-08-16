# frozen_string_literal: true

module Mutations
  module EventsRelated
    class RescheduleEvent < BaseMutation
      field :event, Types::EventsRelated::EventType
      argument :event_id, ID, loads: Types::EventsRelated::EventType

      def resolve(event:)
        {
          event: Stopover::EventManagement::EventRescheduler.new(event, context[:current_user]).perform
        }
      end
    end
  end
end
