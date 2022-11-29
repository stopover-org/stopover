# frozen_string_literal: true

FactoryBot.define do
    factory :attendee_option do
      attendee { create(:attendee) }
      event_option { create(:event_option) }
    end
  end