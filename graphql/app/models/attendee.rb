# frozen_string_literal: true

# == Schema Information
#
# Table name: attendees
#
#  id         :bigint           not null, primary key
#  email      :string
#  first_name :string
#  last_name  :string
#  phone      :string
#  status     :string           default("not_registered")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  booking_id :bigint
#
# Indexes
#
#  index_attendees_on_booking_id  (booking_id)
#
class Attendee < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================

  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :attendee_options, dependent: :destroy

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :schedules, through: :booking

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :booking

  # this has_one should be defined after belongs_to booking
  has_one :event, through: :booking

  # this has_one should be defined after has_one event
  has_many :event_options, -> { where(for_attendee: true) }, through: :event, inverse_of: :event

  # AASM STATES ================================================================
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
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  #
  # CALLBACKS ================================================================
  before_create :create_attendee_options
  before_create :check_max_attendees_count

  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def check_max_attendees_count
    booking.check_max_attendees
  end

  def create_attendee_options
    return if event.event_options.empty?

    event.event_options.available.where(built_in: true, for_attendee: true).find_each do |event_option|
      attendee_options.build(event_option: event_option)
    end
  end
end
