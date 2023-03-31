# frozen_string_literal: true

# == Schema Information
#
# Table name: balances
#
#  id                 :bigint           not null, primary key
#  total_amount_cents :decimal(, )      default(0.0)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  firm_id            :bigint
#
# Indexes
#
#  index_balances_on_firm_id  (firm_id)
#
FactoryBot.define do
  factory :balance do
    total_amount_cents { 250 }
    firm { create(:firm) }
  end
end
