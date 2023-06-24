# frozen_string_literal: true

module Mutations
  class CreateEvent < BaseMutation
    field :event, Types::EventType

    argument :interest_ids, [ID],
             loads: Types::InterestType,
             required: false
    argument :unit_id,      ID,
             loads: Types::UnitType,
             required: false

    argument :title,        String, required: true
    argument :event_type,   Types::EventTypeEnum
    argument :description,  String
    argument :recurring_dates,  [String]
    argument :single_dates,     [String]
    argument :duration_time,    String
    argument :end_date, String

    # Address Fields
    argument :house_number, String, required: false
    argument :street,       String, required: false
    argument :city,         String, required: false
    argument :country,      String, required: false
    argument :region,       String, required: false
    argument :full_address, String
    argument :longitude,    Float, required: false
    argument :latitude,     Float, required: false

    # Event Options Fields
    argument :event_options,      [Types::CreateEventOptionInput], required: false

    # Check In Options
    argument :requires_contract,  Boolean, required: false
    argument :requires_passport,  Boolean, required: false
    argument :requires_check_in,  Boolean, required: false
    argument :max_attendees, Integer, required: false
    argument :min_attendees, Integer, required: false

    argument :organizer_price_per_uom_cents, Integer

    argument :base64_images, [String], required: false

    def resolve(**args)
      event = Stopover::EventManagement::EventCreator.new.execute

      unless args[:base64_images].empty?
        args[:base64_images].each do |base64_image|
          tmp_file = Stopover::FilesSupport.base64_to_file(base64_image)
          event.images.attach(tmp_file)
        end
      end

      event.save!

      { event: event }
    end
  end
end
