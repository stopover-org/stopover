# frozen_string_literal: true

class Achievement < ApplicationRecord
  has_many :event_achievements, dependent: :destroy

  has_many :events, through: :event_achievements
end
