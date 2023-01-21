# frozen_string_literal: true

module Mutations
  class CreateAttendee < BaseMutation
    field :attendee, Types::AttendeeType

    argument :email, String
    argument :first_name, String
    argument :last_name, String
    argument :phone, String
    argument :booking_id, ID, loads: Types::BookingType
  end

  def resolve(**args)
    attendee = Attendee.new(args)

    { attendee: attendee }
  end
end
