# frozen_string_literal: true

module Types
  module Filters
    class InterestsFilter < BaseInputObject
      argument :query, String, required: false
    end
  end
end
