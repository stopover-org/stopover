# frozen_string_literal: true

# == Schema Information
#
# Table name: dynamic_translations
#
#  id                :bigint           not null, primary key
#  source            :string           not null
#  source_field      :string           not null
#  target_language   :string           not null
#  translatable_type :string
#  translation       :string           default(""), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  translatable_id   :bigint
#
# Indexes
#
#  index_dynamic_translations_on_translatable  (translatable_type,translatable_id)
#
require 'rails_helper'

RSpec.describe DynamicTranslation, type: :model do
  describe 'model setup' do
    it 'relations' do
      should belong_to(:translatable)
    end

    it 'validations' do
      should validate_presence_of(:source).allow_nil
      should validate_presence_of(:source_field).allow_nil
      should validate_presence_of(:target_language).allow_nil
    end
  end
end
