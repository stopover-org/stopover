# frozen_string_literal: true

FactoryBot.define do
  factory :booking_option do
    booking { create(:booking) }
    event_option { create(:event_option) }
  end
end
