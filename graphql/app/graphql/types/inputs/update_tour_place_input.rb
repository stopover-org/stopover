# frozen_string_literal: true

module Types
  module Inputs
    class UpdateTourPlaceInput < Types::BaseInputObject
      argument :id, ID, required: false
      argument :title, String
      argument :description, String, required: false
      argument :duration_time, String, required: false
      argument :image, String, required: false
    end
  end
end
