# frozen_string_literal: true

class Account < ApplicationRecord
  include AASM

  has_many :account_interests, dependent: :destroy

  belongs_to :user, optional: false
  has_many :interests, through: :account_interests
  has_many :trips, dependent: :destroy
  has_many :ratings

  validates :name, presence: true

  before_validation :set_user_info

  aasm column: :status do
    state :initial, initial: true
    state :verified
  end

  private

  def set_user_info
    return unless user

    self.primary_phone = user.phone if user.phone
    phones.concat[user.phone] if user.phone && !phones.include?(user.phone)
    phones.concat[primary_phone] if primary_phone && !phones.include?(primary_phone)
  end
end
