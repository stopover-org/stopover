# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class CreateStripeAccount < BaseMutation
      field :setup_account_url, String
      def resolve
        context[:current_user].account.current_firm.stripe_connects.create!
        account_link = Stopover::StripeAccountService.create_stripe_account(context[:current_user])
        {
          setup_account_url: account_link[:account_link],
          notification: 'You will be redirected'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          setup_account_url: nil,
          errors: ['Something went wrong']
        }
      end

      def authorized?(**_inputs)
        return false, { errors: ['You are not authorized'] } unless current_user&.active?
        return false, { errors: ['You are not authorized'] } unless current_firm
        return false, { errors: ['Stripe Connect already exist'] } if current_firm.stripe_connects.active.any?

        super
      end
    end
  end
end
