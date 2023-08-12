# frozen_string_literal: true

module Types
  module Inputs
    class UpdateEventOptionInput < Types::BaseInputObject
      argument :id, ID, loads: Types::EventRelated::EventOptionType, required: false
      argument :title, String
      argument :organizer_price_cents, Integer
      argument :built_in, Boolean
      argument :for_attendee, Boolean
    end
  end
end
