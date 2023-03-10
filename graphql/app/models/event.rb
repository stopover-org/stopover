# frozen_string_literal: true

# == Schema Information
#
# Table name: events
#
#  id                            :bigint           not null, primary key
#  attendee_price_per_uom_cents  :decimal(, )      default(0.0)
#  city                          :string
#  country                       :string
#  description                   :text             not null
#  duration_time                 :string
#  event_type                    :string           not null
#  full_address                  :string
#  house_number                  :string
#  landmark                      :string
#  latitude                      :float
#  longitude                     :float
#  max_attendees                 :integer
#  min_attendees                 :integer          default(0)
#  organizer_price_per_uom_cents :decimal(, )      default(0.0)
#  prepaid_amount_cents          :decimal(, )      default(0.0), not null
#  prepaid_type                  :string
#  recurring_days_with_time      :string           default([]), is an Array
#  recurring_type                :string           not null
#  region                        :string
#  requires_check_in             :boolean          default(FALSE), not null
#  requires_contract             :boolean          default(FALSE), not null
#  requires_passport             :boolean          default(FALSE), not null
#  requires_prepaid              :boolean          default(FALSE), not null
#  single_days_with_time         :datetime         default([]), is an Array
#  status                        :string
#  street                        :string
#  title                         :string           not null
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  external_id                   :string
#  firm_id                       :bigint
#  unit_id                       :bigint
#
# Indexes
#
#  index_events_on_event_type  (event_type)
#  index_events_on_firm_id     (firm_id)
#  index_events_on_unit_id     (unit_id)
#
# Foreign Keys
#
#  fk_rails_...  (firm_id => firms.id)
#  fk_rails_...  (unit_id => units.id)
#

require 'date'

class Event < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # MONETIZE =====================================================================
  monetize :attendee_price_per_uom_cents
  monetize :organizer_price_per_uom_cents
  monetize :prepaid_amount_cents

  # ATTACHMENTS ===========================================================
  has_many_attached :images

  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :event_achievements, dependent: :destroy
  has_many :event_interests, dependent: :destroy
  has_many :event_tags, dependent: :destroy
  has_many :event_options, dependent: :destroy
  has_many :bookings, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :schedules, dependent: :destroy
  has_many :booking_cancellation_options, dependent: :destroy
  has_many :stripe_integrations, as: :stripeable

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :achievements, through: :event_achievements
  has_many :interests, through: :event_interests
  has_many :tags, through: :event_tags

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :unit, optional: true
  belongs_to :firm, optional: false

  # AASM STATES ================================================================
  aasm column: :status do
    state :draft, initial: true
    state :published
    state :unpublished
    state :deleted

    event :publish do
      transitions from: %i[draft unpublished], to: :published
    end
    event :unpublish do
      transitions from: :published, to: :unpublished
    end
    event :soft_delete do
      transitions from: %i[published unpublished draft], to: :deleted
    end
    event :restore do
      transitions from: :deleted, to: :draft
    end
  end

  # ENUMS =======================================================================
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

  # VALIDATIONS ================================================================
  validates :title, length: { maximum: 100 }, unless: :draft?

  validates :title, :description,
            :event_type, :recurring_type,
            :organizer_price_per_uom, :attendee_price_per_uom,
            :unit, :city,
            :country, :full_address,
            :duration_time, presence: true, unless: :draft?

  # CALLBACKS ================================================================
  before_validation :set_prices
  before_validation :update_tags
  before_validation :adjust_prices
  after_save        :check_schedules
  after_commit      :sync_stripe

  # SCOPES =====================================================================
  scope :by_city, ->(city) { where(city: city) }

  # DELEGATIONS ==============================================================
  delegate :count, to: :ratings, prefix: true

  def sync_stripe
    StripeIntegrator.sync(self)
  end

  def can_be_scheduled_for?(date)
    return false if date.past?
    return true if recurring_days_with_time.include?("#{Date::DAYNAMES[date.wday]} #{date.hour}:#{date.min}")
    return true if single_days_with_time.include?(date)
    false
  end

  def adjust_prices
    self.attendee_price_per_uom = (organizer_price_per_uom * (1 + (::Configuration.get_value('EVENT_MARGIN').value.to_i / 100.0)))
  end

  def set_prices
    self.organizer_price_per_uom = Money.new(0) unless organizer_price_per_uom
    self.attendee_price_per_uom = Money.new(0) unless attendee_price_per_uom
  end

  def available_dates
    schedules.where('scheduled_for > ?', Time.zone.now).map(&:scheduled_for)
  end

  def recurring_dates
    recurring_days_with_time.map { |day| day.split(/\s/)[0].downcase.to_sym }.uniq.compact
  end

  def average_rating
    (ratings.sum(&:rating_value) / ratings.count.to_f).round(2)
  end

  def upload_images(images)
    images_to_attach = []

    images.each do |img|
      next unless img[:src].is_a? String

      next if img[:id]

      tmp_file = FilesSupport.base64_to_file(img[:src], img[:title])
      next unless tmp_file

      images_to_attach.push tmp_file
    end.compact!

    images.each do |img|
      img.purge unless images.pluck(:id).include?(img.id)
    end

    images_to_attach.each do |img|
      images.attach(img)
    end
  end

  def check_date(date)
    date = date.to_date
    return false if date.past?
    return true if recurring_dates.include?(Date::DAYNAMES[date.wday].downcase.to_sym)
    return true if single_days_with_time.map(&:to_date).include?(date)
    false
  end

  def get_time(date)
    date = date.to_date
    times = single_days_with_time.keep_if { |d| d.to_date == date }.map { |d| "#{d.hour}:#{d.min}" }.compact.uniq
    times += recurring_days_with_time.keep_if { |d| d.split(/\s+/).first.downcase.to_sym == Date::DAYNAMES[date.wday].downcase.to_sym }.map { |d| d.split(/\s+/).last }.compact.uniq

    times
  end

  private

  def check_schedules
    ScheduleEventJob.perform_later(event_id: id)
  end

  def update_tags
    # interests.each do |interest|
    #   tag = tags.where(title: interest.title.downcase).last
    #   tag ||= Tag.create!(title: interest.title.downcase)
    #   tags.push(tag) unless tags.include?(tag)
    #   tag = nil
    # end

    achievements.each do |achievement|
      tag = Tag.where(title: achievement.title.titleize).last
      tags.build(title: achievement.title.titleize) unless tag
      tag = nil
    end

    if unit
      tag = Tag.where(title: unit.name.titleize).last
      tags.build(title: unit.name.titleize) unless tag
      tag = nil
    end

    # [TODO] to add translations for every event_type
    if event_type
      tag = Tag.where(title: event_type.titleize).last
      tags.build(title: event_type.titleize) unless tag
      tag = nil
    end
  end
end
