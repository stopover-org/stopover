# frozen_string_literal: true

module Types
  module Inputs
    class UpdateTourPlanInput < Types::BaseInputObject
      argument :id, ID, required: false
      argument :title, String
      argument :description, String, required: false
      argument :image, String, required: false
      argument :tour_places, [Types::Inputs::UpdateTourPlaceInput]
    end
  end
end
