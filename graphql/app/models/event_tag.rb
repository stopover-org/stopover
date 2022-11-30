# frozen_string_literal: true

class EventTag < ApplicationRecord
  belongs_to :event
  belongs_to :tag
end
