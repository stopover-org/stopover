# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class VerifyStripeConnect < BaseMutation
      field :stripe_connect, Types::FirmsRelated::StripeConnectType

      argument :stripe_connect_id, ID, loads: Types::FirmsRelated::StripeConnectType

      def resolve(stripe_connect:)
        stripe_connect.activate!

        { stripe_connect: stripe_connect, notification: 'Stripe Connect verified!' }
      rescue StandardError => e
        {
          stripe_connect: nil,
          errors: ['Something went wrong']
        }
      end

      def authorized?(**_inputs)
        return false, { errors: ['You are not authorized'] } unless current_user
        return false, { errors: ['You are not authorized'] } if current_user&.temporary?
        return false, { errors: ['You are not authorized'] } if current_user&.inactive?
        return false, { errors: ['You are not authorized'] } unless current_user&.service_user
        return false, { errors: ['You don\'t have firm'] } unless current_firm
        return false, { errors: ['Stripe Connect already verified'] } if current_firm.stripe_connects.active.any?

        true
      end
    end
  end
end
