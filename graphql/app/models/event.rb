# frozen_string_literal: true
require 'date'

class Event < ApplicationRecord
  include AASM

  has_many :event_achievements, dependent: :destroy
  has_many :event_interests, dependent: :destroy

  has_many :achievements, through: :event_achievements
  has_many :interests, through: :event_interests
  has_many :event_options, dependent: :destroy
  belongs_to :unit, optional: true
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

  # default_scope { select("UNNEST(single_days_with_time) AS day ORDER BY day ASC").active }
  scope :active, -> { where(status: :published) }

  aasm column: :status do
    state :draft, initial: true
    state :published
    state :unpublished
  end

  def set_prices
    self.organizer_cost_per_uom_cents = 0 unless self.organizer_cost_per_uom_cents
    self.attendee_cost_per_uom_cents = 0 unless self.attendee_cost_per_uom_cents
  end

  def available_dates
    [single_days_with_time, recurrent_dates].flatten!
  end

  def tags
    []
  end

  private
  def recurrent_dates
    res = []
    recurring_days_with_time.each do |weekday_with_time|
      day = weekday_with_time.split(' ')
      time = day[1].split(':')
      expected_date = DateTime.now.change({ hour: time[0].to_i, min: time[1].to_i })
      today = expected_date > DateTime.now ? DateTime.now - 1.day : DateTime.now
      4.times.each do |t|
        res.push(get_next_weekday(today + t.weeks, day[0].downcase.to_sym, expected_date))
      end
    end

    res.sort
  end

  def get_next_weekday(date, weekday, time)
    date.change(hour: time.hour, min: time.minute).next_occurring(weekday)
  end
end
