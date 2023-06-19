# frozen_string_literal: true

module Mutations
  class UpdateEvent < BaseMutation
    field :event, Types::EventType

    argument :event_id, ID, loads: Types::EventType
    argument :title, String, required: false
    argument :interest_ids, [ID], loads: Types::InterestType, required: false
    argument :event_type, Types::EventTypeEnum, required: false
    # argument :images
    argument :description, String, required: false

    argument :house_number, String, required: false
    argument :street, String, required: false
    argument :city, String, required: false
    argument :country, String, required: false
    argument :region, String, required: false

    argument :full_address, String, required: false
    argument :longitude, Float, required: false
    argument :latitude, Float, required: false

    argument :dates, [String], required: false
    argument :duration_time, Integer, required: false

    argument :organizer_price_per_uom_cents, Integer, required: false

    argument :event_options, [Types::CreateEventOptionInput], required: false

    argument :requires_contract, Boolean, required: false
    argument :requires_passport, Boolean, required: false
    argument :requires_check_in, Boolean, required: false

    argument :unit_id, ID, loads: Types::UnitType, required: false

    def resolve(event:, **args)
      raise GraphQL::ExecutionError, 'account has no firm' unless context[:current_user].account.current_firm
      raise GraphQL::ExecutionError, 'firm does not have current event' unless context[:current_user].account.current_firm.events.include?(event)

      event.update(**args)
      {
        event: event
      }
    end
  end
end
