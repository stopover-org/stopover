# frozen_string_literal: true

# == Schema Information
#
# Table name: bookings
#
#  id                    :bigint           not null, primary key
#  payment_type          :string
#  status                :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  event_id              :bigint
#  schedule_id           :bigint
#  stripe_integration_id :bigint
#  trip_id               :bigint
#
# Indexes
#
#  index_bookings_on_event_id               (event_id)
#  index_bookings_on_schedule_id            (schedule_id)
#  index_bookings_on_stripe_integration_id  (stripe_integration_id)
#  index_bookings_on_trip_id                (trip_id)
#
# Foreign Keys
#
#  fk_rails_...  (schedule_id => schedules.id)
#  fk_rails_...  (stripe_integration_id => stripe_integrations.id)
#
class Booking < ApplicationRecord
  GRAPHQL_TYPE = Types::BookingsRelated::BookingType

  # MODULES ===============================================================

  include Mixins::Indices
  include AASM

  # MONETIZE ==============================================================

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :event
  belongs_to :trip
  belongs_to :schedule
  belongs_to :stripe_integration

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  has_one :firm, through: :event
  has_one :account, through: :trip
  has_one :user, through: :account

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :booking_options, dependent: :destroy
  has_many :attendees, dependent: :destroy
  has_many :payments, dependent: :nullify
  has_many :refunds, dependent: :nullify
  has_many :attendee_options, dependent: :destroy

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :booking_cancellation_options, through: :event
  has_many :event_options, through: :event

  # AASM STATES ===========================================================
  aasm column: :status do
    state :active, initial: true
    state :cancelled
    state :paid

    event :pay, after_commit: :paid_notify do
      transitions from: :active, to: :paid
    end

    event :partially_pay, after_commit: :not_paid_notify do
      transitions from: :paid, to: :active
    end

    event :cancel do
      transitions from: %i[active paid], to: :cancelled, guard: :can_cancel
    end
  end

  # ENUMS =================================================================
  enum payment_type: {
    cash: 'cash',
    stripe: 'stripe'
  }

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================
  validate :check_max_attendees

  # CALLBACKS =============================================================
  before_validation :create_attendee
  before_validation :adjust_stripe_integration, on: :create
  before_validation :create_booking_options, on: :create
  after_create :created_notify
  after_commit :refund_diff, if: :refundable?

  # SCOPES ================================================================
  default_scope { in_order_of(:status, %w[paid active cancelled]).order(created_at: :asc) }

  # DELEGATION ============================================================

  def check_max_attendees
    return true if event.max_attendees.nil?
    reached_max_attendees = if schedule
                              Attendee.where.not(status: 'removed')
                                      .where(booking_id: Booking.where(schedule_id: schedule.reload.id)
                                                                .where.not(status: 'cancelled')
                                                                .where.not(id: id))
                                      .count + attendees.where.not(status: 'removed').count > event.max_attendees
                            else
                              attendees.where.not(status: 'removed').count > event.max_attendees
                            end
    errors.add(:attendees, 'all places reserved') if reached_max_attendees
  end

  def attendee_total_price
    event_price = event.attendee_price_per_uom * attendees.where.not(status: 'removed').count

    booking_options_price = booking_options.available
                                           .joins(:event_option)
                                           .where(event_option: { built_in: false })
                                           .sum(Money.new(0)) { |opt| opt.attendee_price }
    attendee_options_price = attendee_options.available
                                             .joins(:event_option)
                                             .where(event_option: { built_in: false })
                                             .sum(Money.new(0)) { |opt| opt.attendee_price }

    event_price + booking_options_price + attendee_options_price
  end

  def organizer_total_price
    event_price = event.organizer_price_per_uom * attendees.where.not(status: 'removed').count

    booking_options_price = booking_options.available
                                           .joins(:event_option)
                                           .where(event_option: { built_in: false })
                                           .sum(Money.new(0)) { |opt| opt.organizer_price }
    attendee_options_price = attendee_options.available
                                             .joins(:event_option)
                                             .where(event_option: { built_in: false })
                                             .sum(Money.new(0)) { |opt| opt.organizer_price }

    event_price + booking_options_price + attendee_options_price
  end

  def left_to_pay_price
    price = attendee_total_price - already_paid_price

    return Money.new(0) if price.negative?
    price
  end

  def left_to_pay_deposit_price
    price = event.deposit_amount - already_paid_price

    return Money.new(0) if price.negative?
    price
  end

  def already_paid_price
    total_payments = payments.where(status: :successful)
                             .map(&:total_price).sum(Money.new(0))
    total_refunds = refunds.where.not(status: :cancelled)
                           .where.not(refund_id: nil)
                           .map(&:total_amount).sum(Money.new(0))

    total_payments - total_refunds
  end

  def past?
    schedule.scheduled_for.past?
  end

  def refundable?
    already_paid_price > attendee_total_price
  end

  def partially_paid?
    (left_to_pay_price.positive? || left_to_pay_deposit_price.positive?) && paid?
  end

  def refund_diff
    return unless (already_paid_price - attendee_total_price).positive?

    refund = refunds.create!(firm: firm, refund_amount: already_paid_price - attendee_total_price, penalty_amount: Money.new(0))
    Stopover::RefundManagement::RefundCreator.new(self, user, refund).perform
  end

  def search_data
    {
      title: event.title,
      booked_for: schedule.scheduled_for,

      trip_id: trip.id,
      event_id: event.id,
      schedule_id: schedule.id,
      firm_id: firm.id
    }
  end

  private

  def created_notify
    if account.primary_email
      Notification.create!(
        delivery_method: 'email',
        to: account.primary_email,
        subject: "You booked #{event.title}",
        content: Stopover::MailProvider.prepare_content(file: 'mailer/trips/bookings/booking_created',
                                                        locals: { booking: self })
      )
    end

    Notification.create!(
      delivery_method: 'email',
      to: firm.primary_email,
      subject: "#{event.title} was booked for #{schedule.scheduled_for}",
      content: Stopover::MailProvider.prepare_content(file: 'mailer/firms/bookings/booking_created',
                                                      locals: { booking: self })
    )
  end

  def paid_notify
    return unless account.primary_email
    Notification.create!(
      delivery_method: 'email',
      to: account.primary_email,
      subject: 'Booking paid successfully',
      content: Stopover::MailProvider.prepare_content(file: 'mailer/trips/bookings/paid_successfully',
                                                      locals: { booking: self })
    )
  end

  def not_paid_notify
    return unless account.primary_email
    Notification.create!(
      delivery_method: 'email',
      to: account.primary_email,
      subject: 'Booking price was changed',
      content: Stopover::MailProvider.prepare_content(file: 'mailer/trips/bookings/not_paid_successfully',
                                                      locals: { booking: self })
    )
  end

  def adjust_user
    self.user = account.user if account && !user
  end

  def adjust_firm
    self.firm = event.firm unless firm
  end

  def can_cancel
    payments.processing.empty?
  end

  def create_booking_options
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
