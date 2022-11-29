# frozen_string_literal: true

FactoryBot.define do
  factory :trip do
    status { 'draft' }
    account { create(:account) }
  end
end