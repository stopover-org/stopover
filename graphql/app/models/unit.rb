# frozen_string_literal: true

# == Schema Information
#
# Table name: units
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  unit_type  :string           default(NULL), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Unit < ApplicationRecord
  has_many :events
  enum unit_type: { common: :common, technique: :technique }
end
