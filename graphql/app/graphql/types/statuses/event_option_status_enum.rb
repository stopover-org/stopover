# frozen_string_literal: true

module Types
  module Statuses
    class EventOptionStatusEnum < Types::BaseEnum
      value 'available', 'default value. this option available for booking'
      value 'not_available', 'this option is not available for booking'
    end
  end
end
