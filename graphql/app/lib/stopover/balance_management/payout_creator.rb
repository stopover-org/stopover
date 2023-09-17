# frozen_string_literal: true

module Stopover
  module BalanceManagement
    class PayoutCreator
      def initialize(balance, amount)
        @amount = amount
        @balance = balance
        @firm = balance.firm
      end

      def perform
        return if @amount > @balance.withdrawable_amount

        @payout = @balance.payouts.create!(total_amount: @amount, firm: @firm, balance: @balance)

        PayoutManagement::PayoutProcessing.perform_later(@payout.id)

        @balance.last_payout_at = Time.current
        @balance.total_amount = @balance.total_amount - @amount
        @balance.save!

        @payout
      end
    end
  end
end
