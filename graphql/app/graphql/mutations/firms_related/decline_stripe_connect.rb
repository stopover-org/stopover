# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class DeclineStripeConnect < BaseMutation
      field :stripe_connect, Types::FirmsRelated::StripeConnectType, null: false

      argument :stripe_connect_id, ID, loads: Types::FirmsRelated::StripeConnectType
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
end
