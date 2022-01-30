module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :email, String, null: true
    field :phone, String, null: true
    field :account, Types::AccountType, null: false
  end
end
