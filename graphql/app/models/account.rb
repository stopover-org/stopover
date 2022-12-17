# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts
#
#  id            :bigint           not null, primary key
#  city          :string
#  country       :string
#  full_address  :string
#  house_number  :string
#  latitude      :float
#  longitude     :float
#  name          :string
#  phones        :string           default([]), is an Array
#  primary_phone :string
#  region        :string
#  status        :string           default("initial"), not null
#  street        :string
#  verified_at   :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint
#
# Indexes
#
#  index_accounts_on_user_id  (user_id) UNIQUE
#
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
    phones.concat([user.phone]) if user.phone && phones.exclude?(user.phone)
    phones.concat([primary_phone]) if primary_phone && phones.exclude?(primary_phone)
  end
end
