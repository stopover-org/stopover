# frozen_string_literal: true

module Types
  module FirmRelated
    class StripeConnectType < Types::ModelObject
      field :id, String, null: false
      field :status, Types::Statuses::StripeConnectStatusEnum, null: false
      field :activated_at, Types::DateTimeType
      field :firm, Types::FirmRelated::FirmType, null: false
      field :updated_at, Types::DateTimeType, null: false
      field :created_at, Types::DateTimeType, null: false
    end
  end
end
