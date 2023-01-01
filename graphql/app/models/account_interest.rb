# frozen_string_literal: true

# == Schema Information
#
# Table name: account_interests
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  account_id  :bigint
#  interest_id :bigint
#
# Indexes
#
#  index_account_interests_on_account_id                  (account_id)
#  index_account_interests_on_account_id_and_interest_id  (account_id,interest_id) UNIQUE
#  index_account_interests_on_interest_id                 (interest_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (interest_id => interests.id)
#
class AccountInterest < ApplicationRecord
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
  belongs_to :account, optional: false
  belongs_to :interest, optional: false
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
