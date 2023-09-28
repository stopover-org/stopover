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
          notification: I18n.t('graphql.mutations.withdraw_balance.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          payout: nil
        }
      end

      private

      def authorized?(**inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_firm&.active?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user&.active?
        return false, { errors: [I18n.t('graphql.errors.general')] } if current_firm.stripe_connects.active.empty?
        return false, { errors: [I18n.t('graphql.errors.insufficient_funds')] } if current_firm.balance.withdrawable_amount < Money.new(inputs[:amount_cents])

        super
      end
    end
  end
end
