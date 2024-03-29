# frozen_string_literal: true

module Types
  module Inputs
    class CreateEventOptionInput < Types::BaseInputObject
      argument :title,                  String
      argument :organizer_price_cents,  Integer
      argument :built_in,               Boolean
      argument :for_attendee,           Boolean, required: false
    end
  end
end
