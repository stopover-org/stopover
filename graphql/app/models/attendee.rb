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
  #
  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :attendee_options

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :event_options, through: :attendee_options

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :booking

  # AASM STATES ================================================================
  #
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  #
  # CALLBACKS ================================================================
  before_create :create_attendee_options

  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def create_attendee_options
    booking.event.event_options.where(built_in: true, for_attendee: true).find_each do |event_option|
      attendee_options.build(event_option: event_option)
    end
  end
end
