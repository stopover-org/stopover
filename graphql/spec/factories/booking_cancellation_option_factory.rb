# frozen_string_literal: true

# == Schema Information
#
# Table name: booking_cancellation_options
#
#  id                  :bigint           not null, primary key
#  deadline            :integer          not null
#  description         :text             default("")
#  penalty_price_cents :decimal(, )
#  status              :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  event_id            :bigint
#
# Indexes
#
#  index_booking_cancellation_options_on_event_id  (event_id)
#
FactoryBot.define do
  factory :booking_cancellation_option do
    event { create(:event) }
    deadline { 24 }
    penalty_price { Money.new(10) }
    status { 'active' }
    description { 'description' }
  end
end
