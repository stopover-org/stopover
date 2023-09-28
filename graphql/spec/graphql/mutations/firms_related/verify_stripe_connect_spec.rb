# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::FirmsRelated::VerifyStripeConnect, type: :mutation do
  let(:mutation) do
    "
      mutation VerifyStripeConnect($input: VerifyStripeConnectInput!) {
        verifyStripeConnect(input: $input) {
          stripeConnect {
            id
            status
          }

          errors
          notification
        }
      }
    "
  end
  let(:current_firm) { create(:firm, stripe_connects: build_list(:stripe_connect, 1)) }
  let(:current_user) { create(:service_user, with_account: true) }
  let!(:firm_account) { current_user&.account&.account_firms&.create(firm: current_firm) }

  let(:input) { { stripeConnectId: GraphqlSchema.id_from_object(current_firm.stripe_connects.last) } }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  context 'verify stripe account' do
    it 'successfully' do
      result = nil
      expect(current_firm.stripe_connects.last.status).to eq('pending')

      expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)

      expect(result.dig(:data, :verifyStripeConnect, :stripeConnect, :id)).to eq(GraphqlSchema.id_from_object(current_firm.stripe_connects.last))
      expect(result.dig(:data, :verifyStripeConnect, :stripeConnect, :status)).to eq('active')
      expect(result.dig(:data, :verifyStripeConnect, :error)).to be_nil
      expect(result.dig(:data, :verifyStripeConnect, :notification)).to eq('Stripe Connect verified')
    end

    context 'permissions' do
      context 'with active stripe connect account' do
        before { current_firm.stripe_connects.last.update(status: 'active') }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)

          expect(result.dig(:data, :verifyStripeConnect, :stripeConnect)).to be_nil
          expect(result.dig(:data, :verifyStripeConnect, :errors)).to include('Something went wrong')
          expect(result.dig(:data, :verifyStripeConnect, :notification)).to be_nil
        end
      end

      context 'without current user' do
        let(:current_user) { nil }
        it 'fails' do
          current_firm
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)
          expect(result.dig(:data, :verifyStripeConnect, :stripeConnect)).to be_nil
          expect(result.dig(:data, :verifyStripeConnect, :errors)).to include('You are not authorized')
        end
      end

      context 'for temporary user' do
        let(:current_user) { create(:temporary_user) }
        it 'fails' do
          current_firm
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)
          expect(result.dig(:data, :verifyStripeConnect, :stripeConnect)).to be_nil
          expect(result.dig(:data, :verifyStripeConnect, :errors)).to include('You are not authorized')
        end
      end

      context 'for inactive user' do
        let(:current_user) { create(:inactive_user) }
        it 'fails' do
          current_firm
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)
          expect(result.dig(:data, :verifyStripeConnect, :stripeConnect)).to be_nil
          expect(result.dig(:data, :verifyStripeConnect, :errors)).to include('You are not authorized')
        end
      end

      context 'for common user' do
        let(:current_user) { create(:active_user) }
        it 'fails' do
          current_firm
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)
          expect(result.dig(:data, :verifyStripeConnect, :stripeConnect)).to be_nil
          expect(result.dig(:data, :verifyStripeConnect, :errors)).to include('You are not authorized')
        end
      end
    end
  end
end
