# frozen_string_literal: true

# == Schema Information
#
# Table name: attendees
#
#  id         :bigint           not null, primary key
#  email      :string
#  first_name :string
#  last_name  :string
#  phone      :string
#  status     :string           default("not_registered")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  booking_id :bigint
#
# Indexes
#
#  index_attendees_on_booking_id  (booking_id)
#
FactoryBot.define do
  factory :attendee do
    booking { create(:booking) }
    first_name { Faker::Hipster.name }
  end
end
