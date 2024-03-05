# frozen_string_literal: true

# == Schema Information
#
# Table name: events
#
#  id                            :bigint           not null, primary key
#  attendee_price_per_uom_cents  :decimal(, )      default(0.0)
#  deposit_amount_cents          :decimal(, )      default(0.0), not null
#  description                   :text             not null
#  duration_time                 :string
#  end_date                      :datetime
#  event_type                    :string           not null
#  featured                      :boolean          default(FALSE)
#  landmark                      :string
#  language                      :string           default("en")
#  max_attendees                 :integer
#  min_attendees                 :integer          default(0)
#  organizer_price_per_uom_cents :decimal(, )      default(0.0)
#  recurring_days_with_time      :string           default([]), is an Array
#  ref_number                    :string
#  requires_check_in             :boolean          default(FALSE), not null
#  requires_contract             :boolean          default(FALSE), not null
#  requires_deposit              :boolean          default(FALSE), not null
#  requires_passport             :boolean          default(FALSE), not null
#  single_days_with_time         :datetime         default([]), is an Array
#  status                        :string
#  title                         :string           not null
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  address_id                    :bigint
#  firm_id                       :bigint
#
# Indexes
#
#  index_events_on_address_id              (address_id)
#  index_events_on_event_type              (event_type)
#  index_events_on_firm_id                 (firm_id)
#  index_events_on_ref_number_and_firm_id  (ref_number,firm_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (firm_id => firms.id)
#

require 'date'

class Event < ApplicationRecord
  GRAPHQL_TYPE = Types::EventsRelated::EventType
  TRANSLATABLE_FIELDS = %i[title description duration_time].freeze
  AVAILABLE_LANGUAGES = %i[en ru].freeze

  # MODULES ===============================================================
  include Mixins::Translatable
  include Mixins::Indices
  include AASM

  # MONETIZE =====================================================================
  monetize :attendee_price_per_uom_cents
  monetize :organizer_price_per_uom_cents
  monetize :deposit_amount_cents

  # ATTACHMENTS ===========================================================
  has_many_attached :images

  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :event_interests, dependent: :destroy
  has_many :event_options, dependent: :destroy
  has_many :bookings, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :schedules, dependent: :destroy
  has_many :attendees, dependent: :destroy
  has_many :attendee_options, dependent: :destroy
  has_many :booking_cancellation_options, dependent: :destroy
  has_many :event_placements, dependent: :destroy
  has_many :tour_plans, dependent: :destroy
  has_many :tour_places, dependent: :destroy
  has_many :stripe_integrations, as: :stripeable, dependent: :destroy

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :interests, through: :event_interests

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :firm, optional: false
  belongs_to :address

  # AASM STATES ================================================================
  aasm column: :status do
    state :draft, initial: true
    state :published
    # TODO: rename unpublished to archived
    # including all types, methods and mutations
    state :unpublished
    state :removed

    event :publish, after_commit: :published_notify do
      transitions from: :unpublished, to: :published, guard: :can_publish
    end
    event :unpublish, after_commit: :archived_notify do
      transitions from: %i[draft published], to: :unpublished
    end
    event :remove, after_commit: :removed_notify do
      transitions from: %i[published unpublished draft], to: :removed, guard: :can_remove
    end
    event :restore do
      transitions from: :removed, to: :draft
    end
  end

  # ENUMS =======================================================================
  enum event_type: {
    excursion: 'excursion',
    tour: 'tour',
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
  validates :title,
            length: { maximum: 100 }
  validates :title,
            :description, presence: true
  validates :event_type,
            :duration_time,
            :language,
            :status,
            presence: true
  validates :ref_number,
            uniqueness: { scope: :firm_id },
            allow_blank: true

  # CALLBACKS ================================================================
  before_validation :set_prices, unless: :removed?
  before_validation :adjust_prices, unless: :removed?
  before_validation :adjust_category, unless: :removed?
  before_validation :adjust_min_max_attendees
  before_validation :adjust_address
  after_create :created_notify
  after_commit :sync_stripe, unless: :removed?
  after_commit :adjust_options

  # SCOPES =====================================================================
  default_scope { in_order_of(:status, %w[draft published unpublished removed]).order(created_at: :desc) }
  scope :by_city, ->(city) { where(city: city) }

  # DELEGATIONS ==============================================================
  delegate :count, to: :ratings, prefix: true, allow_nil: true
  delegate :margin, to: :firm, allow_nil: true

  def can_be_scheduled_for?(date)
    return false if date.past?
    return true if recurring_days_with_time.include?("#{Date::DAYNAMES[date.wday]} #{date.hour}:#{date.min}")
    return true if single_days_with_time.include?(date)
    false
  end

  def adjust_prices
    self.attendee_price_per_uom = margin ? (organizer_price_per_uom * (1 + (margin / 100.0))) : organizer_price_per_uom
    self.deposit_amount = attendee_price_per_uom if deposit_amount > attendee_price_per_uom
  end

  def set_prices
    self.organizer_price_per_uom = Money.new(0) unless organizer_price_per_uom
    self.attendee_price_per_uom = Money.new(0) unless attendee_price_per_uom
  end

  def available_dates
    schedules.where('scheduled_for > ?', Time.zone.now).active.pluck(:scheduled_for)
  end

  def recurring_dates
    recurring_days_with_time.map { |day| day.split(/\s/)[0].downcase.to_sym }.uniq.compact if recurring_days_with_time
  end

  def average_rating
    (ratings.sum(&:rating_value) / ratings.count.to_f).round(2) || 0
  end

  def check_date(date)
    date = date.to_date
    return false if date.past?
    return true if recurring_dates&.include?(Date::DAYNAMES[date.wday].downcase.to_sym)
    return true if single_days_with_time&.map(&:to_date)&.include?(date)
    false
  end

  def get_time(date)
    date = date.to_date

    times = []

    times += single_days_with_time.keep_if { |d| d.to_date == date }.map { |d| "#{d.hour}:#{d.min}" }.compact.uniq if single_days_with_time

    if recurring_days_with_time
      times += recurring_days_with_time.select { |d| d.split(/\s+/).first.downcase.to_sym == Date::DAYNAMES[date.wday].downcase.to_sym }
                                       .map { |d| d.split(/\s+/).last }
                                       .compact
                                       .uniq
    end

    times
  end

  def current_stripe_integration
    stripe_integrations.active
                       .last
  end

  def search_data
    {
      title: [title, *dynamic_translations.where(source_field: 'title').map(&:translation)],
      source_title: title,
      country: address&.country,
      city: address&.city,
      dates: schedules.map(&:scheduled_for).map(&:to_time),
      organizer: firm&.title,
      interests: interests.map(&:slug),
      price: attendee_price_per_uom_cents,
      status: status,
      firm_id: firm.id,
      featured: featured
    }
  end

  def archived_notify
    case saved_changes['status'][0]
    when 'published'
      Notification.create!(
        delivery_method: 'email',
        to: firm.primary_email,
        subject: "#{title} was published",
        content: Stopover::MailProvider.prepare_content(file: 'mailer/firms/events/event_archived',
                                                        locals: { event: self })
      )

    when 'draft'
      Notification.create!(
        delivery_method: 'email',
        to: firm.primary_email,
        subject: "#{title} was verified",
        content: Stopover::MailProvider.prepare_content(file: 'mailer/firms/events/event_verified',
                                                        locals: { event: self })
      )

    end
  end

  def removed_notify
    Notification.create!(
      delivery_method: 'email',
      to: firm.primary_email,
      subject: "#{title} was removed",
      content: Stopover::MailProvider.prepare_content(file: 'mailer/firms/events/event_removed',
                                                      locals: { event: self })
    )
  end

  def published_notify
    Notification.create!(
      delivery_method: 'email',
      to: firm.primary_email,
      subject: "#{title} was published",
      content: Stopover::MailProvider.prepare_content(file: 'mailer/firms/events/event_published',
                                                      locals: { event: self })
    )
  end

  def created_notify
    Notification.create!(
      delivery_method: 'email',
      to: firm.primary_email,
      subject: "#{title} was created",
      content: Stopover::MailProvider.prepare_content(file: 'mailer/firms/events/event_created',
                                                      locals: { event: self })
    )
  end

  private

  def adjust_min_max_attendees
    self.max_attendees = nil if max_attendees&.zero?
  end

  def adjust_address
    return if address
    self.address = firm.address
  end

  def sync_stripe
    StripeIntegratorSyncJob.perform_later('event', id)
  end

  def can_remove
    bookings.active.joins(:schedule).where('schedules.scheduled_for > ?', Time.current).empty?
  end

  def can_publish
    firm.active?
  end

  def adjust_category
    return if event_type.nil?
    unless interests.find_by(slug: event_type.humanize.parameterize)
      target_interest = Interest.find_by(slug: event_type.humanize.parameterize)
      interests << target_interest if target_interest
    end
  end

  def adjust_options
    event_options.each do |opt|
      opt.update!(language: language) if language != opt.language
    end
  end
end
