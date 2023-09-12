# frozen_string_literal: true

module Types
  module Inputs
    class UpdateBookingCancellationOptionInput < Types::BaseInputObject
      argument :id, ID, loads: Types::EventsRelated::BookingCancellationOptionType, required: false
      argument :penalty_price_cents,  Integer
      argument :deadline,             Integer
      argument :description,          String
    end
  end
end
