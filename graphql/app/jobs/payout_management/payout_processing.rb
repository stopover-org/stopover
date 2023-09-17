# frozen_string_literal: true

module PayoutManagement
  class PayoutProcessing < ApplicationJob
    def perform(payout_id)
      payout = Payout.find(payout_id)
      payout.process!

      stripe_connect = payout.firm.current_stripe_connect

      return unless stripe_connect

      transfer = Stripe::Transfer.create({
                                           amount: payout.total_amount.cents,
                                           currency: 'usd',
                                           destination: stripe_connect.stripe_connect_id
                                         })

      payout.update(stripe_transfer_id: transfer[:id], sent_at: Time.current)
    end
  end
end
