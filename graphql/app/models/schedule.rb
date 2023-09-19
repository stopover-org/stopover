# frozen_string_literal: true

# == Schema Information
#
# Table name: schedules
#
#  id            :bigint           not null, primary key
#  scheduled_for :datetime         not null
#  status        :string           default("active"), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  event_id      :bigint           not null
#
# Indexes
#
#  index_schedules_on_event_id  (event_id)
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#
class Schedule < ApplicationRecord
  GRAPHQL_TYPE = Types::EventsRelated::ScheduleType

  # MODULES ===============================================================
  include AASM

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :bookings
  has_many :attendees
  has_many :attendee_options

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :event

  # AASM STATES ================================================================
  aasm column: :status do
    state :active, initial: true
    state :disabled
    event :disable do
      transitions from: :active, to: :disabled, guard: :can_disable
    end
  end
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  #
  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  private

  def can_disable
    bookings.where(status: :active).count.zero?
  end
end
