# frozen_string_literal: true

module Types
  module EventsRelated
    class StripeIntegrationType < Types::ModelObject
      field :id,              ID, null: false
      field :stripeable_type, String, null: false
      field :stripeable_id,   String, null: false
      field :price_id,        String, null: false
      field :product_id,      String, null: false
      field :version,         Integer, null: false
      field :status,          Types::Statuses::StripeIntegrationStatusEnum, null: false
    end
  end
end
