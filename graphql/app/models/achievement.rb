class Achievement < ApplicationRecord
  has_many :trip_achievements
  has_many :trips, through: :trip_achievements
end
