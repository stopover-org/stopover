# frozen_string_literal: true

module Types
  class StripeIntegrationType < Types::ModelObject
    field :id, String, null: false
    field :stripeable_type, String, null: false
    field :stripeable_id, String, null: false
    field :price_id, String, null: false
    field :product_id, String, null: false
    field :price_type, String, null: false
    field :status, Types::StripeIntegrationStatusEnum, null: false
  end
end
