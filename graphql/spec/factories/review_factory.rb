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
FactoryBot.define do
  factory :review do
    description { Faker::Hipster.paragraphs.join(' ') }
  end
end
