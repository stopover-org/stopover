# frozen_string_literal: true

module Types
  class ProvidersEnum < Types::BaseEnum
    value 'stripe', 'Stripe method'
    value 'cash', 'Cash method'
  end
end
