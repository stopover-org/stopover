# frozen_string_literal: true

module Types
  module Statuses
    class UserStatusEnum < Types::BaseEnum
      value 'active', 'active user'
      value 'inactive', 'inactive user'
      value 'temporary', 'user was created for booking purposes'
    end
  end
end
