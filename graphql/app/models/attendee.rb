# frozen_string_literal: true

# == Schema Information
#
# Table name: attendees
#
#  id                 :bigint           not null, primary key
#  email              :string
#  first_name         :string
#  last_name          :string
#  phone              :string
#  place              :integer          default([]), is an Array
#  status             :string           default("not_registered")
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  booking_id         :bigint
#  event_id           :bigint
#  event_placement_id :bigint
#  firm_id            :bigint
#  schedule_id        :bigint
#
# Indexes
#
#  index_attendees_on_booking_id          (booking_id)
#  index_attendees_on_event_id            (event_id)
#  index_attendees_on_event_placement_id  (event_placement_id)
#  index_attendees_on_firm_id             (firm_id)
#  index_attendees_on_schedule_id         (schedule_id)
#
class Attendee < ApplicationRecord
  GRAPHQL_TYPE = Types::BookingsRelated::AttendeeType

  # MODULES ===============================================================
  include AASM

  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :booking
  belongs_to :firm
  belongs_to :event
  belongs_to :schedule
  belongs_to :event_placement, optional: true

  # HAS_ONE ASSOCIATIONS ==================================================
  has_one :account, through: :booking

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  has_many :attendee_options, dependent: :destroy

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :event_options, -> { where(for_attendee: true) },
           through: :event,
           inverse_of: :event

  # AASM STATES ===========================================================
  aasm column: :status do
    state :not_registered, initial: true
    state :registered
    state :removed

    event :register, after_commit: :register_notify do
      transitions from: :not_registered, to: :registered
    end

    event :deregister do
      transitions from: :registered, to: :not_registered
    end

    event :remove do
      transitions from: %i[registered not_registered], to: :removed
      after_commit do
        attendee_options.destroy_all
      end
    end
  end

  # ENUMS =================================================================
  #
  # SECURE TOKEN ==========================================================
  #
  # SECURE PASSWORD =======================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # RICH_TEXT =============================================================
  default_scope { in_order_of(:status, %w[registered not_registered removed]).order(created_at: :desc) }

  # VALIDATIONS ===========================================================
  validate :validate_attendee_options

  # CALLBACKS =============================================================
  before_validation :adjust_booking_info
  before_create :create_attendee_options

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def register_notify
    Notification.create!(
      delivery_method: 'email',
      to: booking.account.primary_email,
      subject: 'You was registered',
      content: Stopover::MailProvider.prepare_content(file: 'mailer/trips/bookings/registered_attendee',
                                                      locals: { attendee: self })
    )
  end

  def validate_attendee_options
    errors.add(:booking_options, 'wrong event options') if attendee_options.filter { |opt| !opt.event_option.for_attendee }.any?
  end

  def adjust_booking_info
    self.event = booking&.event unless event
    self.schedule = booking&.schedule unless schedule
    self.firm = booking&.firm unless firm
  end

  def create_attendee_options
    event_options.available.where(built_in: true).find_each do |event_option|
      attendee_options.build(event_option: event_option)
    end
  end
end
