# frozen_string_literal: true

module Types
  module FirmsRelated
    class StripeConnectType < Types::ModelObject
      field :id,            String, null: false
      field :status,        Types::Statuses::StripeConnectStatusEnum, null: false
      field :activated_at,  Types::DateTimeType
      field :firm,          Types::FirmsRelated::FirmType, null: false
      field :updated_at,    Types::DateTimeType, null: false
      field :created_at,    Types::DateTimeType, null: false
    end
  end
end
