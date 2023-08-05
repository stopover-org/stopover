# frozen_string_literal: true

module Mutations
  module FirmsMutations
    class CreateStripeAccount < BaseMutation
      manager_only
      authorize -> { 'Account already exist' if current_firm.stripe_connects.where.not(status: :removed).any? }

      field :setup_account_url, String

      def resolve
        current_firm.stripe_connects.create!
        account_link = Stopover::StripeAccountService.create_stripe_account(current_firm, current_account)
        {
          setup_account_url: account_link[:account_link]
        }
      end
    end
  end
end
