# frozen_string_literal: true

FactoryBot.define do
  factory :account_firm do
    account { create(:account) }
    firm { create(:firm, skip_accounts: true) }
  end
end
