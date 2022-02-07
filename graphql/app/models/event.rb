# frozen_string_literal: true

class Event < ApplicationRecord
  include AASM

  has_many :event_achievements, dependent: :destroy
  has_many :event_interests, dependent: :destroy

  has_many :achievements, through: :event_achievements
  has_many :interests, through: :event_interests
  has_many :event_options, dependent: :destroy
  has_one :unit
  has_many :bookings, dependent: :destroy

  enum recurring_type: { recurrent: :recurrent, regular: :regular }
  enum event_type: { excursion: :excursion, tour: :tour }

  validates :title, length: { maximum: 100 }
  validates :title, :description,
            :event_type, :recurring_type,
            :organizer_cost_per_uom_cents, :attendee_cost_per_uom_cents,
            :unit, :city,
            :country, :full_address,
            :duration_time, presence: true unless :draft?

  before_validation :set_prices

  aasm column: :status do
    state :draft, initial: true
    state :published
    state :unpublished
  end

  def set_prices
    self.organizer_cost_per_uom_cents = 0 unless self.organizer_cost_per_uom_cents
    self.attendee_cost_per_uom_cents = 0 unless self.attendee_cost_per_uom_cents
  end
end
