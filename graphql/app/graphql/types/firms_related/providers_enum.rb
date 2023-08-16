# frozen_string_literal: true

module Types
  module FirmsRelated
    class ProvidersEnum < Types::BaseEnum
      value 'stripe', 'Stripe method'
      value 'cash', 'Cash method'
    end
  end
end
