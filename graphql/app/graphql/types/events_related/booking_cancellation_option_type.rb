# frozen_string_literal: true

module Types
  module EventsRelated
    class BookingCancellationOptionType < Types::ModelObject
      field :id,            ID, null: false
      field :penalty_price, Types::MoneyType, null: false
      field :deadline,      Integer, null: false
      field :description,   String, null: false
      field :status,        Types::Statuses::BookingCancellationOptionStatusEnum, null: false
    end
  end
end
