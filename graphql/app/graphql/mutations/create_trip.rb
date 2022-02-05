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

    argument :trip_option_ids, [ID], loads: Types::TripOptionType
    argument :recurring_type, Types::RecurringTypeEnum
    argument :dates, [String]
    argument :duration_time, Integer

    argument :organizer_cost_per_uom_cents, Integer

    argument :trip_options, [Types::TripOptionType]

    argument :requires_contract, Boolean
    argument :requires_passport, Boolean
    argument :requires_check_in, Boolean

    def resolve(**args); end
  end
end
