# frozen_string_literal: true

class EventAchievement < ApplicationRecord
  belongs_to :event
  belongs_to :achievement
end
