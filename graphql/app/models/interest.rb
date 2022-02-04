class Interest < ApplicationRecord
  has_many :account_interests, dependent: :destroy
  has_many :accounts, through: :account_interests

  scope :title_autocomplete, -> (title) { where('title LIKE ?', "%#{title}%") }
end
