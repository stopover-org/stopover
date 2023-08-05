# frozen_string_literal: true

module Types
  class StripeConnectType < Types::ModelObject
    field :id, String, null: false
    field :status, StripeConnectStatusEnum, null: false
    field :activated_at, Types::DateTimeType
    field :firm, Types::FirmType, null: false
    field :updated_at, Types::DateTimeType, null: false
    field :created_at, Types::DateTimeType, null: false
  end
end
