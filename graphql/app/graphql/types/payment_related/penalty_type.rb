# frozen_string_literal: true

module Types
  module PaymentRelated
    class PenaltyType < Types::ModelObject
      field :amount, Types::MoneyType
      field :booking_cancellation_option, Types::BookingRelated::BookingCancellationOptionType
    end
  end
end
