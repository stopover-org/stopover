# frozen_string_literal: true

module Types
  class InterestsFilter < BaseInputObject
    argument :query, String, required: false
  end
end
