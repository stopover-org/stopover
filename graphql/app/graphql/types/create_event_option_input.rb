# frozen_string_literal: true

module Types
  class CreateEventOptionInput < Types::BaseInputObject
    argument :title, String
    argument :organizer_price_cents, Integer
    argument :built_in, Boolean
  end
end
