# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class VerifyStripeConnect < BaseMutation
      field :stripe_connect, Types::FirmsRelated::StripeConnectType, null: false

      argument :stripe_connect_id, ID, loads: Types::FirmsRelated::StripeConnectType

      def resolve(stripe_connect:)
        stripe_connect.activate!

        { stripe_connect: stripe_connect }
      end
    end
  end
end
