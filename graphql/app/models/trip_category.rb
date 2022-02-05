# frozen_string_literal: true

class TripCategory < ApplicationRecord
  belongs_to :trip
  belongs_to :category
end
