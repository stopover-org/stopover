# frozen_string_literal: true

# == Schema Information
#
# Table name: tour_places
#
#  id           :bigint           not null, primary key
#  description  :text
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  event_id     :bigint
#  firm_id      :bigint
#  tour_plan_id :bigint
#
# Indexes
#
#  index_tour_places_on_event_id      (event_id)
#  index_tour_places_on_firm_id       (firm_id)
#  index_tour_places_on_tour_plan_id  (tour_plan_id)
#
FactoryBot.define do
  factory :tour_place do
    title { Faker::Company.name }
    description { Faker::Lorem.paragraph(sentence_count: 10, supplemental: true, random_sentences_to_add: 2) }
    tour_plan { create(:tour_plan) }
  end
end
