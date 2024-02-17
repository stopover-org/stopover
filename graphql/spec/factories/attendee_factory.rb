# frozen_string_literal: true

# == Schema Information
#
# Table name: attendees
#
#  id                 :bigint           not null, primary key
#  email              :string
#  first_name         :string
#  last_name          :string
#  phone              :string
#  place              :integer          default([]), is an Array
#  status             :string           default("not_registered")
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  booking_id         :bigint
#  event_id           :bigint
#  event_placement_id :bigint
#  firm_id            :bigint
#  schedule_id        :bigint
#
# Indexes
#
#  index_attendees_on_booking_id          (booking_id)
#  index_attendees_on_event_id            (event_id)
#  index_attendees_on_event_placement_id  (event_placement_id)
#  index_attendees_on_firm_id             (firm_id)
#  index_attendees_on_schedule_id         (schedule_id)
#
FactoryBot.define do
  factory :attendee do
    booking { create(:booking) }
    first_name { Faker::Hipster.name }
  end
end
