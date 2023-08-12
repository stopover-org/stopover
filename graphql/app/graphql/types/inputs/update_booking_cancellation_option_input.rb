# frozen_string_literal: true

module Types
  module Inputs
    class UpdateBookingCancellationOptionInput < Types::BaseInputObject
      argument :id, ID, loads: Types::BookingRelated::BookingCancellationOptionType, required: false
      argument :penalty_price_cents, Integer
      argument :deadline, String
      argument :description, String
    end
  end
end
