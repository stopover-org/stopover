# frozen_string_literal: true

module Types
  class StripeIntegrationStatusEnum < Types::BaseEnum
    value 'active', 'default value. stripe integration was initialized'
    value 'removed', 'stripe integration was removed'
  end
end
