# frozen_string_literal: true

class Unit < ApplicationRecord
  belongs_to :event, optional: true
  enum unit_type: { common: :common, technique: :technique }
end
