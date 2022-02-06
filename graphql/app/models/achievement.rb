# frozen_string_literal: true

class Achievement < ApplicationRecord
  has_many :event_achievements
  has_many :events, through: :event_achievements
end
