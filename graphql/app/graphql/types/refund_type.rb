# frozen_string_literal: true

module Types
  class RefundType < Types::ModelObject
    field :amount, Types::MoneyType
    field :author_type, Types::AuthorEnum
    field :account, Types::AccountType
    field :status, Types::Statuses::PaymentStatusEnum
  end
end
