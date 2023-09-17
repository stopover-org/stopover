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
require 'rails_helper'

RSpec.describe AccountInterest, type: :model do
  describe 'model setup' do
    it 'relations' do
      should belong_to(:account)
      should belong_to(:interest)
    end
  end
end
