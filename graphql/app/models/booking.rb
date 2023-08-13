# frozen_string_literal: true

# == Schema Information
#
# Table name: bookings
#
#  id                    :bigint           not null, primary key
#  status                :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  cancelled_by_id       :bigint
#  event_id              :bigint
#  schedule_id           :bigint
#  stripe_integration_id :bigint
#  trip_id               :bigint
#
# Indexes
#
#  index_bookings_on_cancelled_by_id        (cancelled_by_id)
#  index_bookings_on_event_id               (event_id)
#  index_bookings_on_schedule_id            (schedule_id)
#  index_bookings_on_stripe_integration_id  (stripe_integration_id)
#  index_bookings_on_trip_id                (trip_id)
#
# Foreign Keys
#
#  fk_rails_...  (cancelled_by_id => users.id)
#  fk_rails_...  (schedule_id => schedules.id)
#  fk_rails_...  (stripe_integration_id => stripe_integrations.id)
#
class Booking < ApplicationRecord
  # MODULES =======================================================================
  include AASM

  # MONETIZE ======================================================================
  #
  # ATTACHMENTS ===================================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================

  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :booking_options,  dependent: :destroy
  has_many :attendees,        dependent: :destroy
  has_many :payments,         dependent: :destroy

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :attendee_options, through: :attendees
  has_many :refunds

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :event
  belongs_to :trip
  belongs_to :schedule
  belongs_to :stripe_integration, optional: true
  belongs_to :cancelled_by, class_name: 'Account', optional: true

  has_one :account, through: :trip
  has_one :user,    through: :account
  has_one :firm,    through: :event

  has_many :booking_cancellation_options, through: :event

  has_many :event_options,
           -> { where(for_attendee: false) },
           through: :event
  # AASM STATES =================================================================
  aasm column: :status do
    state :active, initial: true
    state :cancelled
    state :paid

    event :unpay do
      transitions   from: :paid, to: :active, guard: :can_unpay?
    end

    event :pay do
      transitions   from: :active, to: :paid
    end

    event :cancel do
      transitions   from: %i[active paid], to: :cancelled
      after_commit  :cancellation_notify
    end
  end

  # ENUMS =======================================================================
  #
  # VALIDATIONS =================================================================

  # CALLBACKS ===================================================================
  before_validation :ensure_paid
  before_create :create_attendee
  before_create :adjust_stripe_integration
  before_create :create_booking_options

  # SCOPES ======================================================================
  #
  # DELEGATIONS =================================================================

  def check_max_attendees
    return if event.max_attendees.nil?

    reached_max_attendees = schedule.attendees.count + attendees.count > event.max_attendees
    errors.add(:attendees, 'all places reserved') if reached_max_attendees
  end

  def attendee_total_price
    event_price = event.attendee_price_per_uom * attendees.count

    booking_options_price = booking_options.sum(Money.new(0)) { |opt| opt.event_option.built_in ? 0 : opt.attendee_price }
    attendee_options_price = attendees.sum(Money.new(0)) do |att|
      res = Money.new(0)
      att.attendee_options.each do |opt|
        res += if opt.event_option.built_in
                 0
               else
                 opt.attendee_price
               end
      end

      res
    end

    event_price + booking_options_price + attendee_options_price
  end

  def organizer_total_price
    event_price = event.organizer_price_per_uom * attendees.count
    booking_options_price = booking_options.sum(Money.new(0)) { |opt| opt.event_option.built_in ? 0 : opt.organizer_price }
    attendee_options_price = attendees.sum(Money.new(0)) do |att|
      res = Money.new(0)
      att.attendee_options.each do |opt|
        res += if opt.event_option.built_in
                 0
               else
                 opt.organizer_price
               end
      end

      res
    end

    event_price + booking_options_price + attendee_options_price
  end

  def ensure_paid
    if left_to_pay_price.positive? && paid?
      unpay!
    elsif left_to_pay_price.zero? && active?
      pay!
    end
  end

  def left_to_pay_price
    attendee_total_price - already_paid_price
  end

  def already_paid_price
    payments.successful.map(&:total_price).sum(Money.new(0))
  end

  def current_cancellation_option
    return nil if event.booking_cancellation_options.active.empty?

    event.booking_cancellation_options
         .active
         .where('deadline::INTEGER > :current_deadline',
                current_deadline: (schedule.scheduled_for.to_time - Time.current) / 60 / 60)
         .first
  end

  private

  def can_unpay?
    return false if cancelled? && cancelled_by
    true
  end

  def cancellation_notify
    Notification.create(
      origin_key: Notification::ORIGIN_KEYS[:trip_booking_cancelled],
      to: trip.delivery_to,
      subject: 'Booking Cancelled',
      content: Stopover::MailProvider.prepare_content(file: "mailer/#{Notification::ORIGIN_KEYS[:trip_booking_cancelled]}",
                                                      locals: { booking: self }),
      delivery_method: trip.delivery_method
    )

    Notification.create(
      origin_key: Notification::ORIGIN_KEYS[:firm_booking_cancelled],
      to: firm.delivery_to,
      subject: 'Booking Cancelled',
      content: Stopover::MailProvider.prepare_content(file: "mailer/#{Notification::ORIGIN_KEYS[:firm_booking_cancelled]}",
                                                      locals: { booking: self }),
      delivery_method: firm.delivery_method
    )
  end

  def create_booking_options
    return if event.event_options.empty?

    event.event_options.available.where(built_in: true, for_attendee: false).find_each do |event_option|
      booking_options.build(event_option: event_option)
    end
  end

  def create_attendee
    attendees.build if attendees.empty?
  end

  def adjust_stripe_integration
    self.stripe_integration = event.current_stripe_integration
  end
end
