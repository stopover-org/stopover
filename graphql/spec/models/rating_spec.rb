# frozen_string_literal: true

# == Schema Information
#
# Table name: ratings
#
#  id           :bigint           not null, primary key
#  rating_value :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :bigint
#  event_id     :bigint
#  review_id    :bigint
#
# Indexes
#
#  index_ratings_on_account_id  (account_id)
#  index_ratings_on_event_id    (event_id)
#  index_ratings_on_review_id   (review_id)
#
require 'rails_helper'

RSpec.describe Rating, type: :model do
  describe 'model setup' do
    it 'constants' do
      # should have constant check for gql type
    end

    it 'relations' do
      should belong_to(:event)
      should belong_to(:account).optional
      should belong_to(:review)
    end

    it 'validations' do
      should validate_presence_of(:rating_value)
      should validate_numericality_of(:rating_value).is_in(1..5)
    end

    context 'callbacks' do
      let(:review) { Review.new(account: create(:account), event: create(:event), firm: create(:firm)) }
      let(:rating) { Rating.create(review: review) }

      it 'adjust account' do
        expect(rating.account).to eq(review.account)
      end

      it 'adjust event' do
        expect(rating.event).to eq(review.event)
      end
    end
  end
end
