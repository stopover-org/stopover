# frozen_string_literal: true

class Unit < ApplicationRecord
  has_many :events
  enum unit_type: { common: :common, technique: :technique }
end
