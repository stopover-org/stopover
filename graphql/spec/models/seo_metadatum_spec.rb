# frozen_string_literal: true

# == Schema Information
#
# Table name: seo_metadata
#
#  id          :bigint           not null, primary key
#  description :string           default("")
#  keywords    :string           default("")
#  title       :string           default("")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe SeoMetadatum, type: :model do
  describe 'model setup' do
    it 'relations' do
      should belong_to(:event).optional(true)
      should belong_to(:interest).optional(true)
      should belong_to(:firm).optional(true)
    end
  end
end
