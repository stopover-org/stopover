# frozen_string_literal: true

# == Schema Information
#
# Table name: attendees
#
#  id          :bigint           not null, primary key
#  email       :string
#  first_name  :string
#  last_name   :string
#  phone       :string
#  status      :string           default("not_registered")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  booking_id  :bigint
#  event_id    :bigint
#  firm_id     :bigint
#  schedule_id :bigint
#
# Indexes
#
#  index_attendees_on_booking_id   (booking_id)
#  index_attendees_on_event_id     (event_id)
#  index_attendees_on_firm_id      (firm_id)
#  index_attendees_on_schedule_id  (schedule_id)
#
class Attendee < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # MONETIZE ==============================================================

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :booking
  belongs_to :firm
  belongs_to :event
  belongs_to :schedule

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

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

    event :register do
      transitions from: :not_registered, to: :registered
    end

    event :deregister do
      transitions from: :registered, to: :not_registered
    end

    event :remove do
      transitions from: %i[registered not_registered], to: :removed
    end
  end

  # ENUMS =================================================================

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================

  # CALLBACKS =============================================================
  before_validation :adjust_booking_info
  before_create :create_attendee_options

  def full_name
    "#{first_name} #{last_name}"
  end

  def attendee_total_price
    event.attendee_price_per_uom + attendee_options.where(built_in: false).sum(&:attendee_price)
  end

  private

  def adjust_booking_info
    self.event = booking&.event unless event
    self.schedule = booking&.schedule unless schedule
    self.firm = booking&.firm unless firm
  end

  def create_attendee_options
    event.event_options.available.where(built_in: true, for_attendee: true).find_each do |event_option|
      attendee_options.build(event_option: event_option)
    end
  end
end
