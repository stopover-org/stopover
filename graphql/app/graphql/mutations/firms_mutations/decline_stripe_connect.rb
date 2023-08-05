# frozen_string_literal: true

module Mutations
  class DeclineStripeConnect < BaseMutation
    service_user_only
    field :stripe_connect, Types::StripeConnectType, null: false

    argument :stripe_connect_id, ID, loads: Types::StripeConnectType
    argument :soft, Boolean, required: true

    def resolve(stripe_connect:, soft:)
      if soft
        stripe_connect.deactivate!
      else
        stripe_connect.remove!
      end

      { stripe_connect: stripe_connect }
    end
  end
end
