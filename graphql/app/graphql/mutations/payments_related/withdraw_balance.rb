# frozen_string_literal: true

module Mutations
  module PaymentsRelated
    class WithdrawBalance < BaseMutation
      argument :amount_cents, Integer

      field :payout, Types::PaymentsRelated::PayoutType
      field :balance, Types::FirmsRelated::BalanceType

      def resolve(**args)
        payout = current_firm.balance.payout!(Money.new(args[:amount_cents]))

        {
          payout: payout,
          notification: 'We sent money to your account!'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          errors: [e.message]
        }
      end

      private

      def authorized?(**inputs)
        return false, { errors: ['You are not authorized'] } unless current_firm&.active?
        return false, { errors: ['You are not authorized'] } unless current_user&.active?
        return false, { errors: ['You need to set up stripe connect'] } if current_firm.stripe_connects.active.empty?
        return false, { errors: ['Insufficient funds'] } if current_firm.balance.withdrawable_amount < Money.new(inputs[:amount_cents])

        super
      end
    end
  end
end
