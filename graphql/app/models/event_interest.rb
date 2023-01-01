# frozen_string_literal: true

# == Schema Information
#
# Table name: event_interests
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  event_id    :bigint
#  interest_id :bigint
#
# Indexes
#
#  index_event_interests_on_event_id     (event_id)
#  index_event_interests_on_interest_id  (interest_id)
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#  fk_rails_...  (interest_id => interests.id)
#
class EventInterest < ApplicationRecord
  # MODULES ===============================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  #
  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :event
  belongs_to :interest

  # AASM STATES ================================================================
  #
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  #
  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================
end
