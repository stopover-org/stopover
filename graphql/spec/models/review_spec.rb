# frozen_string_literal: true

# == Schema Information
#
# Table name: reviews
#
#  id              :bigint           not null, primary key
#  attendees_count :integer
#  author          :string
#  description     :text
#  language        :string
#  title           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  account_id      :bigint
#  event_id        :bigint
#  firm_id         :bigint
#
# Indexes
#
#  index_reviews_on_account_id  (account_id)
#  index_reviews_on_event_id    (event_id)
#  index_reviews_on_firm_id     (firm_id)
#
require 'rails_helper'

RSpec.describe Review, type: :model do
  describe 'model setup' do
    it 'constants' do
      # should have constant check for gql type
    end

    it 'relations' do
      should belong_to(:event)
      should belong_to(:firm)
      should belong_to(:account).optional

      should have_one(:rating)
    end

    it 'validations' do
      should validate_presence_of(:title)
      should validate_presence_of(:language)
      should validate_presence_of(:author)
    end

    context 'callbacks' do
      let(:review) { Review.create(account: create(:account), event: create(:event)) }

      it 'adjust firm' do
        expect(review.firm).to eq(review.event.firm)
      end

      it 'adjust author' do
        expect(review.author).to eq(review.account.name)
      end
    end
  end
end
