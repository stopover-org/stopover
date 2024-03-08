# frozen_string_literal: true

# == Schema Information
#
# Table name: interests
#
#  id          :bigint           not null, primary key
#  active      :boolean          default(TRUE)
#  description :text             default("")
#  language    :string           default("en")
#  slug        :string           not null
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_interests_on_slug   (slug) UNIQUE
#  index_interests_on_title  (title) UNIQUE
#
FactoryBot.define do
  factory :interest do
    title { Faker::Coffee.blend_name + (0...50).map { rand(65..90).chr }.join }
    description { Faker::Lorem.paragraph(sentence_count: 10, supplemental: true, random_sentences_to_add: 2) }
  end
end
