# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::FirmsRelated::CreateStripeAccount, type: :mutation do
  let(:mutation) do
    "
      mutation CreateStripeAccount($input: CreateStripeAccountInput!) {
        createStripeAccount(input: $input) {
          setupAccountUrl

          errors
          notification
        }
      }
    "
  end
  let(:current_firm) { create(:firm) }
  let(:current_user) { create(:service_user, with_account: true) }
  let!(:firm_account) { current_user&.account&.account_firms&.create(firm: current_firm) }

  let(:input) { {} }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  context 'create stripe account' do
    it 'successfully' do
      expect(Stripe::Account).to receive(:create).and_return({ id: 'account_id' })
      expect(Stripe::Account).to receive(:update).and_return({ id: 'account_id' })
      expect(Stripe::AccountLink).to receive(:create).and_return({ url: 'http://example.com' })
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(1)

      expect(current_firm.stripe_connects.last.status).to eq('pending')

      expect(result.dig(:data, :createStripeAccount, :setupAccountUrl)).to eq('http://example.com')
      expect(result.dig(:data, :createStripeAccount, :error)).to be_nil
      expect(result.dig(:data, :createStripeAccount, :notification)).to eq('Stripe Connect was created!')
    end

    context 'permissions' do
      let(:current_firm) { create(:firm, stripe_connects: build_list(:stripe_connect, 1)) }
      context 'with active stripe connect account' do
        before { current_firm.stripe_connects.last.update(status: 'active') }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)

          expect(result.dig(:data, :createStripeAccount, :setupAccountUrl)).to be_nil
          expect(result.dig(:data, :createStripeAccount, :errors)).to include('Stripe Connect already exist')
          expect(result.dig(:data, :createStripeAccount, :notification)).to be_nil
        end
      end

      context 'without current user' do
        let(:current_user) { nil }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { FiStripeConnectrm.count }.by(0)
          expect(result.dig(:data, :createStripeAccount, :setupAccountUrl)).to be_nil
          expect(result.dig(:data, :createStripeAccount, :errors)).to include('You are not authorized')
        end
      end

      context 'for temporary user' do
        let(:current_user) { create(:temporary_user) }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)
          expect(result.dig(:data, :createStripeAccount, :setupAccountUrl)).to be_nil
          expect(result.dig(:data, :createStripeAccount, :errors)).to include('You are not authorized')
        end
      end

      context 'for inactive user' do
        let(:current_user) { create(:inactive_user) }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)
          expect(result.dig(:data, :createStripeAccount, :setupAccountUrl)).to be_nil
          expect(result.dig(:data, :createStripeAccount, :errors)).to include('You are not authorized')
        end
      end

      context 'for common user' do
        let(:current_user) { create(:active_user) }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)
          expect(result.dig(:data, :createStripeAccount, :setupAccountUrl)).to be_nil
          expect(result.dig(:data, :createStripeAccount, :errors)).to include('You are not authorized')
        end
      end
    end
  end
end
