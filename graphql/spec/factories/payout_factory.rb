# frozen_string_literal: true

# == Schema Information
#
# Table name: payouts
#
#  id                 :bigint           not null, primary key
#  completed_at       :datetime
#  sent_at            :datetime
#  status             :string
#  total_amount_cents :decimal(, )
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  balance_id         :bigint
#  firm_id            :bigint
#  stripe_transfer_id :string
#
# Indexes
#
#  index_payouts_on_balance_id  (balance_id)
#  index_payouts_on_firm_id     (firm_id)
#
FactoryBot.define do
  factory :payout do
    status { 'pending' }
    firm { create(:firm) }
    total_amount { Money.new(100) }
  end
end
