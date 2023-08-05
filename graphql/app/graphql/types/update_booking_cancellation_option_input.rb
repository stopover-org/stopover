# frozen_string_literal: true

module Types
  class UpdateBookingCancellationOptionInput < Types::BaseInputObject
    argument :id, ID, loads: Types::BookingCancellationOptionType, required: false
    argument :penalty_price_cents, Integer
    argument :deadline, String
    argument :description, String
  end
end
