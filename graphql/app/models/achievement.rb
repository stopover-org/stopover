# frozen_string_literal: true

# == Schema Information
#
# Table name: achievements
#
#  id         :bigint           not null, primary key
#  active     :boolean          default(TRUE)
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_achievements_on_title  (title) UNIQUE
#
class Achievement < ApplicationRecord
  has_many :event_achievements, dependent: :destroy

  has_many :events, through: :event_achievements
end
