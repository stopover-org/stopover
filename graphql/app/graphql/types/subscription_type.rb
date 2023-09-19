# frozen_string_literal: true

module Types
  class SubscriptionType < GraphQL::Schema::Object
    field :booking_changed, subscription: Subscriptions::BookingChanged
  end
end
