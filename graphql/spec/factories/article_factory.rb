# frozen_string_literal: true

# == Schema Information
#
# Table name: articles
#
#  id               :bigint           not null, primary key
#  content          :text
#  language         :string           default("en")
#  published_at     :datetime
#  title            :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  seo_metadatum_id :bigint
#
# Indexes
#
#  index_articles_on_seo_metadatum_id  (seo_metadatum_id)
#
FactoryBot.define do
  factory :article do
    title { Faker::App.name }
    content { Faker::Hipster.paragraphs.join('. ') }
  end
end
