# frozen_string_literal: true

FactoryBot.define do
  factory attendee do
    first_name { Faker::Hipster.name }
  end
end
