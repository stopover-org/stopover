# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::PaymentsRelated::WithdrawBalance, type: :mutation do
  let(:mutation) do
    "
      mutation WithdrawBalance($input: WithdrawBalanceInput!) {
        withdrawBalance(input: $input) {
          payout {
            id
            status
            totalAmount {
              cents
            }
          }

          errors
          notification
        }
      }
    "
  end
  let!(:firm) { create(:firm, status: 'active') }
  let!(:payments) do
    create_list(:payment, 2,
                firm: firm,
                balance: firm.balance,
                booking: create(:booking, firm: firm),
                total_price: Money.new(60_000),
                status: 'successful')
  end
  let!(:stripe_connect) { create(:stripe_connect, firm: firm, status: 'active') }
  let(:current_user) { firm.accounts.last.user }

  let(:input) { { amountCents: 10_000 } }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Payout.count }.by(1)

      expect(result.dig(:data, :withdrawBalance, :payout, :status)).to eq('pending')
      expect(result.dig(:data, :withdrawBalance, :payout, :totalAmount, :cents)).to eq(10_000)
      expect(result.dig(:data, :withdrawBalance, :notification)).to eq('We sent money to your account!')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Payout.count }.by(0)

      expect(result.dig(:data, :withdrawBalance, :url)).to be_nil
      expect(result.dig(:data, :withdrawBalance, :errors)).to include(error)
    end
  end

  context 'create checkout url' do
    context 'as manager' do
      include_examples :successful
    end

    context 'permissions' do
      context 'without stripe connects' do
        before { StripeConnect.delete_all }
        include_examples :fail, 'You need to set up stripe connect'
      end

      context 'for insufficient funds' do
        let(:input) { { amountCents: 300_000 } }
        include_examples :fail, 'Insufficient funds'
      end

      context 'for removed firm' do
        before { firm.update(status: 'removed') }
        include_examples :fail, 'You are not authorized'
      end

      context 'as common user' do
        let(:current_user) { create(:active_user) }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
