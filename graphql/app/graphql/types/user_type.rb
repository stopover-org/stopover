# frozen_string_literal: true

module Types
  class UserType < Types::ModelObject
    field :id, ID, null: false
    field :email, String, null: true
    field :phone, String, null: true
    field :status, Types::UserStatusEnum, null: false
    field :account, Types::AccountType, null: false
  end
end
