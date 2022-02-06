# frozen_string_literal: true

class Event < ApplicationRecord
  has_many :event_achievements
  has_many :event_interests
  has_many :achievements, through: :event_achievements
  has_many :interests, through: :event_interests
  has_many :event_options
  has_one :unit

  enum recurring_type: { recurring: :recurring, non_recurring: :non_recurring }
  enum event_type: { excursion: :excursion, tour: :tour }
end
