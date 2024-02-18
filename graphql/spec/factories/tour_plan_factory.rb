# frozen_string_literal: true

# == Schema Information
#
# Table name: tour_plans
#
#  id          :bigint           not null, primary key
#  description :text
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  event_id    :bigint
#  firm_id     :bigint
#
# Indexes
#
#  index_tour_plans_on_event_id  (event_id)
#  index_tour_plans_on_firm_id   (firm_id)
#
FactoryBot.define do
  factory :tour_plan do
    title { Faker::Company.name }
    description { Faker::Lorem.paragraph(sentence_count: 10, supplemental: true, random_sentences_to_add: 2) }
    event { create(:event) }
  end
end
