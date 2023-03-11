# frozen_string_literal: true

module Types
  class PaymentType < Types::ModelObject
    field :id, ID, null: false
    field :checkout_id, String
    field :success_url, String
    field :cancel_url, String
  end
end
