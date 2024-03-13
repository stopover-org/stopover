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
require 'rails_helper'

RSpec.describe Article, type: :model do
  describe 'model setup' do
    it 'relations' do
      should belong_to(:seo_metadatum).optional(true)

      should have_many(:article_interests).dependent(:destroy)

      should have_many(:interests).through(:article_interests)
    end

    it 'validations' do
      should validate_presence_of(:title)
      should validate_presence_of(:content)
      should validate_presence_of(:language)
    end

    it 'enum' do
      should define_enum_for(:language).with_values(en: 'en',
                                                    ru: 'ru')
                                       .backed_by_column_of_type(:string)
                                       .with_prefix(true)
    end
  end

  describe 'metadata' do
    subject { create(:article) }
    include_examples :include_metadata
  end
end
