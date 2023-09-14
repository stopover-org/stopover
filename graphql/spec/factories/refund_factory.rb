# frozen_string_literal: true

# == Schema Information
#
# Table name: trips
#
#  id           :bigint           not null, primary key
#  city         :string
#  country      :string
#  end_date     :date
#  full_address :string
#  latitude     :float
#  longitude    :float
#  region       :string
#  start_date   :date
#  status       :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :bigint
#
# Indexes
#
#  index_trips_on_account_id  (account_id)
#
FactoryBot.define do
  factory :refund do
    status { 'pending' }
    booking { create(:booking) }
    firm { booking.firm }
    refund_amount { Money.new(100) }
    penalty_amount { Money.new(0) }
  end
end
