# frozen_string_literal: true

require 'rails_helper'

RSpec.describe StripeAccount, type: :helper do
  describe 'stripe support' do
    let!(:user) { create(:user) }
    let!(:account_spec) { create(:account, user: user) }
    let!(:firm) { create(:firm, accounts: [account_spec]) }
    it 'calling stripe support create_stripe_account fires up two Stripe methods' do
      expect(Stripe::Account).to receive(:create).with(
        type: 'custom',
        country: account_spec.country,
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true }
        }
      ).and_return({ id: 'account_id' })

      expect(Stripe::AccountLink).to receive(:create).with(
        account: 'account_id',
        refresh_url: 'https://example.com/reauth',
        return_url: 'https://example.com/return',
        type: 'account_onboarding'
      )

      Stopover::StripeAccount.create_stripe_account(user)
      expect(user.account.current_firm.stripe_account).to eq('{:id=>"account_id"}')
    end
  end
end
