# frozen_string_literal: true

module Types
  module AccountRelated
    class UserType < Types::ModelObject
      field :id, ID, null: false
      field :email, String, null: true
      field :phone, String, null: true
      field :status, Types::Statuses::UserStatusEnum, null: false
      field :account, Types::AccountRelated::AccountType, null: false
      field :service_user, Boolean, null: false, require_service_user: true
    end
  end
end
