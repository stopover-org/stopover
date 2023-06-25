# frozen_string_literal: true

module Types
  class UpdateEventOptionInput < Types::BaseInputObject
    argument :id, ID, loads: Types::EventOptionType
    argument :title, String
    argument :organizer_price_cents, Integer
    argument :built_in, Boolean
  end
end
