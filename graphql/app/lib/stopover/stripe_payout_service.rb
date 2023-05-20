# frozen_string_literal: true

module Stopover
  class StripePayoutService
    def self.create_payout(user, amount)
      Stripe::Transfer.create({
                                amount: amount,
                                currency: 'czk',
                                destination: user.account.current_firm.stripe_account_id
                              })
    end
  end
end
