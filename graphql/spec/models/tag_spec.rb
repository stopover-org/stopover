# frozen_string_literal: true

# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  language   :string           default("en")
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_tags_on_title  (title) UNIQUE
#
require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe 'model setup' do
    subject { create(:tag) }
    it 'constants' do
      expect(Tag::GRAPHQL_TYPE).to eq(Types::TagType)
    end

    it 'relations' do
      should have_many(:event_tags).dependent(:destroy)
      should have_many(:dynamic_translations).dependent(:destroy)

      should have_many(:events).through(:event_tags)
    end

    it 'validations' do
      should validate_presence_of(:title)
      should validate_presence_of(:language)
    end
  end
end
