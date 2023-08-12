# == Schema Information
#
# Table name: refunds
#
#  id           :bigint           not null, primary key
#  amount_cents :bigint           not null
#  author_type  :string           not null
#  status       :string           default("pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :bigint
#  balance_id   :bigint
#  booking_id   :bigint
#
# Indexes
#
#  index_refunds_on_account_id  (account_id)
#  index_refunds_on_balance_id  (balance_id)
#  index_refunds_on_booking_id  (booking_id)
#
FactoryBot.define do
  factory :refund do
    
  end
end
