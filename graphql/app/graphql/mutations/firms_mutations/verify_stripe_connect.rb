# frozen_string_literal: true

module Mutations
  class VerifyStripeConnect < BaseMutation
    service_user_only
    field :stripe_connect, Types::StripeConnectType, null: false

    argument :stripe_connect_id, ID, loads: Types::StripeConnectType

    def resolve(stripe_connect:)
      stripe_connect.activate!

      { stripe_connect: stripe_connect }
    end
  end
end
