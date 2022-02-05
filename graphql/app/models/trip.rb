class Trip < ApplicationRecord
  has_many :trip_achievements
  has_many :trip_categories
  has_many :achievements, through: :trip_achievements
  has_many :categories, through: :trip_categories
  has_many :trip_options
end
