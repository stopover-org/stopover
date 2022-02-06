# frozen_string_literal: true

module Mutations
  class CreateEvent < GraphQL::Schema::RelayClassicMutation
    field :event, Types::EventType

    argument :title, String
    argument :interest_ids, [ID], loads: Types::InterestType
    argument :event_type, Types::EventTypeEnum
    # argument :images
    argument :description, String

    argument :house_number, String, required: false
    argument :street, String, required: false
    argument :city, String
    argument :country, String
    argument :region, String, required: false

    argument :full_address, String
    argument :longitude, Float
    argument :latitude, Float

    argument :recurring_type, Types::RecurringTypeEnum
    argument :dates, [String]
    argument :duration_time, Integer

    argument :organizer_cost_per_uom_cents, Integer

    argument :event_options, [Types::CreateEventOptionInput]

    argument :requires_contract, Boolean
    argument :requires_passport, Boolean
    argument :requires_check_in, Boolean

    argument :unit_id, ID, loads: Types::UnitType

    def resolve(**args)
      event = Event.new(
        title: args[:title],
        interests: args[:interests],
        event_type: args[:event_type],
        description: args[:description],
        house_number: args[:house_number],
        street: args[:street],
        city: args[:city],
        country: args[:country],
        full_address: args[:full_address],
        longitude: args[:longitude],
        latitude: args[:latitude],
        recurring_type: args[:recurring_type],
        duration_time: args[:duration_time],
        organizer_cost_per_uom_cents: args[:organizer_cost_per_uom_cents],
        requires_contract: args[:requires_contract],
        requires_passport: args[:requires_passport],
        requires_check_in: args[:requires_check_in],
        event_options: args[:event_options].map { |option| EventOption.new(**option) }
      )
      if event.recurring_type == 'recurring'
        event.recurring_days_with_time = ::EventSupport.prepare_dates(event,
                                                                      args[:dates])
      end
      if event.recurring_type == 'non_recurring'
        event.single_days_with_time = ::EventSupport.prepare_dates(event,
                                                                   args[:dates])
      end

      event.save!

      { event: event }
    end
  end
end
