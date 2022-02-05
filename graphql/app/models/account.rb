class Account < ApplicationRecord
  include AASM

  belongs_to :user, optional: false
  has_many :account_interests, dependent: :destroy
  has_many :interests, through: :account_interests

  aasm column: :status do
    state :initial, initial: true
    state :verified
  end
end
