# frozen_string_literal: true

class EventInterest < ApplicationRecord
  belongs_to :event
  belongs_to :interest
end
