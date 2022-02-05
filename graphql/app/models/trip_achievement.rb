class TripAchievement < ApplicationRecord
  belongs_to :trip
  belongs_to :achievement
end
