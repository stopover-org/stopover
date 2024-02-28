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
FactoryBot.define do
  factory :rating do
    rating_value { 4 }
  end
end
