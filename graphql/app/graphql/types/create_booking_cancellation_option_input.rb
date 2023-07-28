# frozen_string_literal: true

module Types
  class CreateBookingCancellationOptionInput < Types::BaseInputObject
    argument :penalty_price_cents, Integer
    argument :deadline, String
    argument :description, String
  end
end
