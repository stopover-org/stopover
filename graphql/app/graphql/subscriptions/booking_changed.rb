# frozen_string_literal: true

module Subscriptions
  class BookingChanged < Subscriptions::BaseSubscription
    field :booking, Types::BookingsRelated::BookingType
  end
end
