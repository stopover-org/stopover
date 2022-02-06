# frozen_string_literal: true

class Trip < ApplicationRecord
  has_many :trip_achievements
  has_many :trip_categories
  has_many :achievements, through: :trip_achievements
  has_many :categories, through: :trip_categories
  has_many :trip_options
  has_one :unit

  enum recurring_type: { recurring: 0, non_recurring: 1 }
  enum trip_type: { excursion: 0, tour: 1 }
end
