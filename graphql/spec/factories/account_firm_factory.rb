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
FactoryBot.define do
  factory :account_firm do
    account { create(:account) }
    firm { create(:firm, skip_accounts: true) }
  end
end
