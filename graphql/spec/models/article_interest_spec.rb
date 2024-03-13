# frozen_string_literal: true

# == Schema Information
#
# Table name: article_interests
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  article_id  :bigint
#  interest_id :bigint
#
# Indexes
#
#  index_article_interests_on_article_id                  (article_id)
#  index_article_interests_on_article_id_and_interest_id  (article_id,interest_id) UNIQUE
#  index_article_interests_on_interest_id                 (interest_id)
#
require 'rails_helper'

RSpec.describe ArticleInterest, type: :model do
  describe 'model setup' do
    it 'relations' do
      should belong_to(:article)
      should belong_to(:interest)
    end

    it 'validates' do
      should validate_uniqueness_of(:article_id).scoped_to(:interest_id)
    end
  end
end
