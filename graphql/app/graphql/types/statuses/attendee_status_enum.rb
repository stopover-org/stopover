# frozen_string_literal: true

module Types
  module Statuses
    class AttendeeStatusEnum < Types::BaseEnum
      value 'not_registered', 'default value'
      value 'registered', 'user had come to the event'
      value 'removed', 'user was removed by manager'
    end
  end
end
