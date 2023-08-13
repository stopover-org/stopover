# frozen_string_literal: true

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
    account { booking.account }
    firm { booking.event.firm }
    trait :manager do
      author_type { 'manager' }
    end

    trait :attendee do
      author_type { 'attendee' }
    end

    factory :manager_refund, traits: [:manager]
    factory :attendee_refund, traits: [:attendee]
  end
end
