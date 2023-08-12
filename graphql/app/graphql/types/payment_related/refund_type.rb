# frozen_string_literal: true

module Types
  module PaymentRelated
    class RefundType < Types::ModelObject
      field :amount, Types::MoneyType
      field :author_type, Types::PaymentRelated::AuthorTypeEnum
      field :account, Types::AccountRelated::AccountType
      field :status, Types::Statuses::PaymentStatusEnum
      field :penalty, Types::PaymentRelated::PenaltyType
    end
  end
end
