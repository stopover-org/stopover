# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Workers::EnsurePaymentsJob, type: :job do
  describe 'complete payments that should be completed' do
    let(:firm) { create(:firm) }
    let(:booking) { create(:booking) }
    let!(:payments) do
      create_list(:payment_in_process, 4,
                  booking: booking,
                  balance: firm.balance,
                  with_checkout_session_id: true)
    end

    it 'completed payments' do
      payment1 = Payment.first
      payment2 = Payment.second
      payment3 = Payment.third
      payment4 = Payment.fourth
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment1.stripe_checkout_session_id)
                                                             .and_return({ status: 'complete' })
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment2.stripe_checkout_session_id)
                                                             .and_return({ status: 'complete' })
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment3.stripe_checkout_session_id)
                                                             .and_return({ status: 'open' })
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment4.stripe_checkout_session_id)
                                                             .and_return({ status: 'open' })

      expect(Payment.processing.count).to eq(4)

      Sidekiq::Testing.inline! do
        Workers::EnsurePaymentsJob.perform_later
        expect(Payment.successful.count).to eq(2)
        expect(Payment.processing.count).to eq(2)
      end
    end

    it 'expired payments' do
      payment1 = Payment.first
      payment2 = Payment.second
      payment3 = Payment.third
      payment4 = Payment.fourth
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment1.stripe_checkout_session_id)
                                                             .and_return({ status: 'expired' })
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment2.stripe_checkout_session_id)
                                                             .and_return({ status: 'expired' })
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment3.stripe_checkout_session_id)
                                                             .and_return({ status: 'open' })
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment4.stripe_checkout_session_id)
                                                             .and_return({ status: 'open' })

      expect(Payment.processing.count).to eq(4)

      Sidekiq::Testing.inline! do
        Workers::EnsurePaymentsJob.perform_later
        expect(Payment.canceled.count).to eq(2)
        expect(Payment.processing.count).to eq(2)
      end
    end

    it 'nothing changed' do
      payment1 = Payment.first
      payment2 = Payment.second
      payment3 = Payment.third
      payment4 = Payment.fourth
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment1.stripe_checkout_session_id)
                                                             .and_return({ status: 'open' })
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment2.stripe_checkout_session_id)
                                                             .and_return({ status: 'open' })
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment3.stripe_checkout_session_id)
                                                             .and_return({ status: 'open' })
      expect(Stripe::Checkout::Session).to receive(:retrieve).with(payment4.stripe_checkout_session_id)
                                                             .and_return({ status: 'open' })

      expect(Payment.processing.count).to eq(4)

      Sidekiq::Testing.inline! do
        Workers::EnsurePaymentsJob.perform_later
        expect(Payment.processing.count).to eq(4)
      end
    end
  end
end
