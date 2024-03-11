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
require 'rails_helper'

RSpec.describe SeoMetadatum, type: :model do
  describe 'model setup' do
    it 'constants' do
      expect(SeoMetadatum::GRAPHQL_TYPE).to eq(Types::SeoRelated::SeoMetadatumType)
    end

    it 'relations' do
      should have_one(:event)
      should have_one(:interest)
      should have_one(:firm)
    end

    it 'enums' do
      should define_enum_for(:language).with_values(en: 'en',
                                                    ru: 'ru')
                                       .backed_by_column_of_type(:string)
                                       .with_prefix(true)
    end
  end
end
