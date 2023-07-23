# frozen_string_literal: true

module Mutations
  class SyncStripe < BaseMutation
    field :event, Types::EventType

    argument :event_id, ID, loads: Types::EventType

    def resolve(event:)
      Stopover::StripeIntegrator.sync(event)

      event.event_options.each do |event_option|
        Stopover::StripeIntegrator.sync(event_option)
      end

      {
        event: event
      }
    end
  end
end
