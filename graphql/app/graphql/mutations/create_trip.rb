# frozen_string_literal: true

module Types
  class CreateTrip < BaseMutation
    argument :title, String
    argument :category_ids, [ID], loads: Types::CategoryType
    argument :trip_type, Types::TripTypeEnum
    # argument :images
    argument :description, String

    argument :house_number, String, required: false
    argument :street, String, required: false
    argument :city, String
    argument :country, String
    argument :region, String

    argument :full_address, String
    argument :longitude, Float
    argument :latitude, Float

    argument :recurring_type, Types::RecurringTypeEnum
    argument :dates, [String]
    argument :duration_time, Integer

    argument :organizer_cost_per_uom_cents, Integer

    argument :trip_options, [Types::TripOptionType]

    argument :requires_contract, Boolean
    argument :requires_passport, Boolean
    argument :requires_check_in, Boolean

    argument :unit_id, ID, loads: Types::UnitType

    def resolve(**args)
      trip = Trip.new(
        title: args[:title],
        categories: args[:categories],
        trip_type: args[:trip_type],
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
        requires_check_in: args[:requires_check_in]
      )
      if trip.recurring_type == 'recurring'
        trip.recurring_days_with_time = TripSupport.prepare_dates(trip,
                                                                  args[:dates])
      end
      if trip.recurring_type == 'non_recurring'
        trip.single_days_with_time = TripSupport.prepare_dates(trip,
                                                               args[:dates])
      end

      trip.save!
    end
  end
end
