# frozen_string_literal: true

module Types
  class RefundType < Types::ModelObject
    field :amount, Types::MoneyType
    field :booking_cancellation_option, Types::BookingCancellationOptionType
  end
end
