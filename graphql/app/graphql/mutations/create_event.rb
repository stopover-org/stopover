# frozen_string_literal: true

module Mutations
  class CreateEvent < BaseMutation
    field :event, Types::EventType

    argument :title, String, required: true
    argument :interest_ids, [ID],
             loads: Types::InterestType,
             required: false
    argument :event_type, Types::EventTypeEnum
    argument :description, String

    argument :house_number, String, required: false
    argument :street, String, required: false
    argument :city, String, required: false
    argument :country, String, required: false
    argument :region, String, required: false

    argument :full_address, String
    argument :longitude, Float, required: false
    argument :latitude, Float, required: false

    argument :recurring_type, Types::RecurringTypeEnum
    argument :recurring_dates, [String]
    argument :single_dates, [String]
    argument :duration_time, String

    argument :organizer_price_per_uom_cents, Integer

    argument :event_options, [Types::CreateEventOptionInput], required: false

    argument :requires_contract, Boolean, required: false
    argument :requires_passport, Boolean, required: false
    argument :requires_check_in, Boolean, required: false
    argument :max_attendees, Integer, required: false
    argument :min_attendees, Integer, required: false

    argument :base64_images, [String], required: false

    argument :unit_id, ID, loads: Types::UnitType, required: false

    def resolve(**args)
      event = Event.new(args.except(:recurring_dates,
                                    :single_dates,
                                    :event_options,
                                    :base64_images))
      event.firm = context[:current_user].account.current_firm
      event.event_options = args[:event_options]&.map { |option| EventOption.new(**option) } if args[:event_options].present?

      event.recurring_days_with_time = Stopover::EventSupport.prepare_dates('recurrent',
                                                                            args[:recurring_dates])
      event.single_days_with_time = Stopover::EventSupport.prepare_dates('non_recurrent',
                                                                         args[:single_dates])

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
