# frozen_string_literal: true

# == Schema Information
#
# Table name: trips
#
#  id         :bigint           not null, primary key
#  end_date   :date
#  start_date :date
#  status     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  account_id :bigint
#
# Indexes
#
#  index_trips_on_account_id  (account_id)
#
FactoryBot.define do
  factory :trip do
    status { 'draft' }
    account { create(:account) }
  end
end
