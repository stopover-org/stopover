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

  # MONETIZE ==============================================================

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :event

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :bookings
  has_many :attendees
  has_many :attendee_options

  # HAS_MANY THROUGH ASSOCIATIONS =========================================

  # AASM STATES ===========================================================
  aasm column: :status do
    state :active, initial: true
    state :disabled
    event :disable do
      transitions from: :active, to: :disabled, guard: :can_disable
    end
  end

  # ENUMS =================================================================

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================

  # CALLBACKS =============================================================
  after_commit :reindex_event

  # SCOPES ================================================================
  default_scope { in_order_of(:status, %w[active disabled]).order(scheduled_for: :asc) }

  # DELEGATION ============================================================

  private

  def can_disable
    bookings.where(status: :active).count.zero?
  end

  def reindex_event
    event.reindex
  end
end
