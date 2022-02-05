# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :trip_categories
  has_many :trips, through: :trip_categories
end
