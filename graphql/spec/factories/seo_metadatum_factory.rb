# frozen_string_literal: true

# == Schema Information
#
# Table name: seo_metadata
#
#  id          :bigint           not null, primary key
#  description :string           default("")
#  keywords    :string           default("")
#  language    :string           default("en")
#  title       :string           default("")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :seo_metadatum do
    title { 'Seo Metadata Title' }
    description { 'Seo Metadata Description' }
    keywords { 'Seo Metadata Keywords' }
  end
end
