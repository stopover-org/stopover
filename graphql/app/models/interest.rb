# frozen_string_literal: true

class Interest < ApplicationRecord
  has_many :account_interests, dependent: :destroy
  has_many :event_interests, dependent: :destroy

  has_many :accounts, through: :account_interests
  has_many :events, through: :event_interests

  scope :title_autocomplete, ->(title) { where('title LIKE ?', "%#{title}%") }
end
