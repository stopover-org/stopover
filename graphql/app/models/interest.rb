# frozen_string_literal: true

# == Schema Information
#
# Table name: interests
#
#  id         :bigint           not null, primary key
#  active     :boolean          default(TRUE)
#  slug       :string           not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_interests_on_slug   (slug) UNIQUE
#  index_interests_on_title  (title) UNIQUE
#
class Interest < ApplicationRecord
  has_one_attached :preview
  has_many :account_interests, dependent: :destroy
  has_many :event_interests, dependent: :destroy

  has_many :accounts, through: :account_interests
  has_many :events, through: :event_interests

  scope :title_autocomplete, ->(title) { where('title LIKE ?', "%#{title}%") }
end
