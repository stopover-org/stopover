# frozen_string_literal: true

module Mutations
  class UpdateEvent < BaseMutation
    field :event, Types::EventType

    argument :event_id, ID, loads: Types::EventType

    argument :interest_ids, [ID],
             loads: Types::InterestType,
             required: false
    argument :unit_id,      ID,
             loads: Types::UnitType,
             required: false

    argument :title,            String, required: true
    argument :event_type,       Types::EventTypeEnum, required: false
    argument :description,      String, required: false
    argument :recurring_dates,  [String], required: false
    argument :single_dates,     [String], required: false
    argument :duration_time,    String, required: false
    argument :end_date,         Types::DateTimeType, required: false

    # Address Fields
    argument :house_number, String, required: false
    argument :street,       String, required: false
    argument :city,         String, required: false
    argument :country,      String, required: false
    argument :region,       String, required: false
    argument :full_address, String, required: false
    argument :longitude,    Float, required: false
    argument :latitude,     Float, required: false

    # Event Options Fields
    argument :event_options,
             [Types::UpdateEventOptionInput],
             required: false

    # Check In Options
    argument :requires_contract,  Boolean, required: false
    argument :requires_passport,  Boolean, required: false
    argument :requires_check_in,  Boolean, required: false
    argument :max_attendees,      Integer, required: false
    argument :min_attendees,      Integer, required: false

    argument :organizer_price_per_uom_cents, Integer, required: false

    argument :images, [String], required: false

    def resolve(event:, **args)
      raise GraphQL::ExecutionError, 'account has no firm' unless context[:current_user].account.current_firm
      raise GraphQL::ExecutionError, 'firm does not have current event' unless context[:current_user].account.current_firm.events.include?(event)

      event = Stopover::EventManagement::EventUpdater.new(event).execute(**args)

      {
        event: event
      }
    end
  end
end
