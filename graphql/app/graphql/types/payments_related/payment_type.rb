# frozen_string_literal: true

module Types
  module PaymentsRelated
    class PaymentType < Types::ModelObject
      field :id, ID, null: false
      field :status, String, null: false
      field :total_price, Types::MoneyType, null: false
      field :payment_type, Types::PaymentsRelated::PaymentTypesEnum
      field :updated_at, DateTimeType, null: false
      field :created_at, DateTimeType, null: false
      field :booking, Types::BookingsRelated::BookingType, null: false
      field :refunds, Types::PaymentsRelated::RefundType.connection_type, null: false

      def refunds(**_args)
        arguments = {
          query_type: ::RefundsQuery,
          payment_id: object.id
        }
        Connections::SearchkickConnection.new(arguments: arguments)
      end
    end
  end
end
