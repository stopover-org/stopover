# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class DeclineStripeConnect < BaseMutation
      field :stripe_connect, Types::FirmsRelated::StripeConnectType

      argument :stripe_connect_id, ID, loads: Types::FirmsRelated::StripeConnectType
      argument :soft, Boolean, required: true

      def resolve(stripe_connect:, soft:)
        if soft
          stripe_connect.deactivate!
        else
          stripe_connect.remove!
        end

        { stripe_connect: stripe_connect, notification: soft ? 'Stripe Connect deactivated!' : 'Stripe Connect removed!' }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        { errors: [e.message], notification: 'Something went wrong' }
      end

      def authorized?(**_inputs)
        return false, { errors: ['You are not authorized'] } unless current_user
        return false, { errors: ['You are not authorized'] } if current_user&.temporary?
        return false, { errors: ['You are not authorized'] } if current_user&.inactive?
        return false, { errors: ['You are not authorized'] } unless current_user&.service_user
        return false, { errors: ['You don\'t have firm'] } unless current_firm

        super
      end
    end
  end
end
