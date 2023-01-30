# frozen_string_literal: true

module Types
  class BookingCancellationOptionType < Types::ModelObject
    field :id, ID, null: false
    field :penalty_price, Types::MoneyType
    field :deadline, Types::DateTimeType
    field :status, Types::BookingCancellationOptionStatusEnum
  end
end
