# frozen_string_literal: true

module Mutations
  class CreateStripeAccount < BaseMutation
    field :setup_account_url, String
    def resolve
      account_link = Stopover::StripeAccountService.create_stripe_account(context[:current_user])
      {
        setup_account_url: account_link[:account_link]
      }
    end

  rescue StandardError => e
    Sentry.capture_exception(e) if Rails.env.production?
    {
      setup_account_url: nil
    }
  end
end
