# frozen_string_literal: true

module Types
  module UsersRelated
    class UserType < Types::ModelObject
      field :id, ID, null: false
      field :email, String, null: true
      field :phone, String, null: true
      field :status, Types::Statuses::UserStatusEnum, null: false
      field :account, Types::UsersRelated::AccountType, null: false
      field :service_user, Boolean, null: false
    end
  end
end
