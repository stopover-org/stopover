# frozen_string_literal: true

module Types
  module Statuses
    class StripeConnectStatusEnum < Types::BaseEnum
      value 'pending', 'default value. stripe connect was just initialized'
      value 'active', 'active stripe integration'
      value 'inactive', 'stripe connect was out of sync'
      value 'removed', 'stripe connect was removed'
    end
  end
end
