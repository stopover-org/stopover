# frozen_string_literal: true

# == Schema Information
#
# Table name: event_placements
#
#  id            :bigint           not null, primary key
#  height_places :integer          default(0)
#  places        :jsonb
#  title         :string
#  width_places  :integer          default(0)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  event_id      :bigint
#  firm_id       :bigint
#
# Indexes
#
#  index_event_placements_on_event_id  (event_id)
#  index_event_placements_on_firm_id   (firm_id)
#
FactoryBot.define do
  factory :event_placement do
    title { Faker::App.name }
    event { create(:event) }
    width_places { 7 }
    height_places { 5 }
  end
end
