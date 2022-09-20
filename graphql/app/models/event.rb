# frozen_string_literal: true

require 'date'

class Event < ApplicationRecord
  has_many_attached :images

  include AASM

  has_many :event_achievements, dependent: :destroy
  has_many :event_interests, dependent: :destroy
  has_many :event_tags, dependent: :destroy

  has_many :achievements, through: :event_achievements
  has_many :interests, through: :event_interests
  has_many :tags, through: :event_tags
  has_many :event_options, dependent: :destroy
  belongs_to :unit, optional: true
  has_many :bookings, dependent: :destroy

  enum recurring_type: { recurrent: 'recurrent', regular: 'regular' }
  enum event_type: {
    # old one
    excursion: 'excursion',
    tour: 'tour',
    # new one
    in_town: 'in_town',
    out_of_town: 'out_of_town',
    active_holiday: 'active_holiday',
    music: 'music',
    workshop: 'workshop',
    business_breakfast: 'business_breakfast',
    meetup: 'meetup',
    sport_activity: 'sport_activity',
    gastronomic: 'gastronomic'
  }

  validates :title, length: { maximum: 100 }, unless: :draft?
  validates :title, :description,
            :event_type, :recurring_type,
            :organizer_cost_per_uom_cents, :attendee_cost_per_uom_cents,
            :unit, :city,
            :country, :full_address,
            :duration_time, presence: true, unless: :draft?

  before_validation :set_prices
  before_validation :update_tags

  default_scope { where(status: :published) }
  scope :by_city, ->(city) { where(city: city) }

  aasm column: :status do
    state :draft, initial: true
    state :published
    state :unpublished
  end

  # it's not a scope because it cannot be chained to other query
  def self.events_between(start_date, end_date = Time.zone.now + 1.year)
    Event.where(id: execute_events_by_dates(start_date, end_date).values.map { |v| v[0] })
  end

  def set_prices
    self.organizer_cost_per_uom_cents = 0 unless organizer_cost_per_uom_cents
    self.attendee_cost_per_uom_cents = 0 unless attendee_cost_per_uom_cents
  end

  def available_dates
    [single_days_with_time.map { |t| t.to_datetime }, recurrent_dates].flatten.compact.sort
  end

  private

  def update_tags
    interests.each do |interest|
      tag = tags.where(title: interest.title.downcase).last
      tag ||= Tag.create!(title: interest.title.downcase)
      tags.push(tag) unless tags.include?(tag)
      tag = nil
    end

    achievements.each do |achievement|
      tag = Tag.where(title: achievement.title.downcase).last
      tag ||= Tag.create!(title: achievement.title.downcase)
      tags.push(tag) unless tags.include?(tag)
      tag = nil
    end

    if unit
      tag = tags.where(title: unit.name.titleize.downcase).last
      tag ||= Tag.create!(title: unit.name.titleize.downcase)
      tags.push(tag) unless tags.include?(tag)
      tag = nil
    end

    # [TODO] to add translations for every event_type
    if event_type
      tag = tags.where(title: event_type.titleize.downcase).last
      tag ||= Tag.create!(title: event_type.titleize.downcase)
      tags.push(tag) unless tags.include?(tag)
      tag = nil
    end
  end

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

  def self.execute_events_by_dates(start_date, end_date)
    sql = <<-SQL
      WITH dates AS (
          SELECT DISTINCT
              *,
              unnest(get_timestamp_from_weekday(unnest(recurring_days_with_time), :start_date::TIMESTAMP, :end_date::TIMESTAMP)) recurrent_date,
              unnest(single_days_with_time::TIMESTAMP[]) single_date
          FROM events
      )
      SELECT DISTINCT *
      FROM dates
      WHERE
          recurrent_date BETWEEN :start_date::TIMESTAMP AND :end_date::TIMESTAMP
          OR single_date BETWEEN :start_date::TIMESTAMP AND :end_date::TIMESTAMP
    SQL

    ActiveRecord::Base.connection.execute(ActiveRecord::Base.sanitize_sql([sql, {
                                                                            start_date: start_date, end_date: end_date
                                                                          }]))
  end
end
