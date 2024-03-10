# frozen_string_literal: true

# == Schema Information
#
# Table name: interests
#
#  id               :bigint           not null, primary key
#  active           :boolean          default(TRUE)
#  description      :text             default("")
#  language         :string           default("en")
#  slug             :string           not null
#  title            :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  seo_metadatum_id :bigint
#
# Indexes
#
#  index_interests_on_seo_metadatum_id  (seo_metadatum_id)
#  index_interests_on_slug              (slug) UNIQUE
#  index_interests_on_title             (title) UNIQUE
#
require 'rails_helper'

RSpec.describe Interest, type: :model do
  describe 'model setup' do
    subject { create(:interest) }
    it 'constants' do
      expect(Interest::GRAPHQL_TYPE).to eq(Types::EventsRelated::InterestType)
    end

    it 'relations' do
      should belong_to(:seo_metadatum).optional(true)

      should have_many(:account_interests).dependent(:destroy)
      should have_many(:event_interests).dependent(:destroy)
      should have_many(:dynamic_translations).dependent(:destroy)

      should have_many(:accounts).through(:account_interests)
      should have_many(:events).through(:event_interests)
    end

    it 'validations' do
      should validate_presence_of(:title)
      should validate_presence_of(:language)
      should validate_presence_of(:active)
      should validate_uniqueness_of(:slug).case_insensitive
      should validate_uniqueness_of(:title).case_insensitive
    end

    it 'attachments' do
      should have_one_attached(:preview)
    end

    it 'enums' do
      should define_enum_for(:language).with_values(en: 'en',
                                                    ru: 'ru')
                                       .backed_by_column_of_type(:string)
                                       .with_prefix(true)
    end

    it 'callbacks' do
      allow(subject).to receive(:set_slug)

      subject
    end
  end
end
