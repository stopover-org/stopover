# frozen_string_literal: true

# == Schema Information
#
# Table name: account_firms
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  account_id :bigint
#  firm_id    :bigint
#
# Indexes
#
#  index_account_firms_on_account_id  (account_id)
#  index_account_firms_on_firm_id     (firm_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (firm_id => firms.id)
#
require 'rails_helper'

RSpec.describe AccountFirm, type: :model do
  describe 'model setup' do
    it 'relations' do
      should belong_to(:firm)
      should belong_to(:account)
    end
  end
end
