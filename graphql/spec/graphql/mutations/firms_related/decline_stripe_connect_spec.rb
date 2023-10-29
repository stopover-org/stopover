# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::FirmsRelated::DeclineStripeConnect, type: :mutation do
  let(:mutation) do
    "
      mutation DeclineStripeConnect($input: DeclineStripeConnectInput!) {
        declineStripeConnect(input: $input) {
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
  let(:current_firm) { create(:firm, stripe_connects: build_list(:stripe_connect, 1, status: :active)) }
  let(:current_user) { create(:service_user, with_account: true) }
  let!(:firm_account) { current_user&.account&.account_firms&.create(firm: current_firm) }

  before do
    current_user.account.update!(firm: current_firm) if current_user&.account
  end

  let(:input) do
    { stripeConnectId: GraphqlSchema.id_from_object(current_firm.stripe_connects.last),
                  soft: true }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  context 'decline stripe account' do
    context 'deactivate' do
      it 'successfully' do
        result = nil
        expect(current_firm.stripe_connects.last.status).to eq('active')

        expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)

        expect(result.dig(:data, :declineStripeConnect, :stripeConnect, :id)).to eq(GraphqlSchema.id_from_object(current_firm.stripe_connects.last))
        expect(result.dig(:data, :declineStripeConnect, :stripeConnect, :status)).to eq('inactive')
        expect(result.dig(:data, :declineStripeConnect, :error)).to be_nil
        expect(result.dig(:data, :declineStripeConnect, :notification)).to eq('Account declined')
      end
    end

    context 'remove' do
      it 'successfully' do
        result = nil
        expect(current_firm.stripe_connects.last.status).to eq('active')
        input[:soft] = false

        expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)

        expect(result.dig(:data, :declineStripeConnect, :stripeConnect, :id)).to eq(GraphqlSchema.id_from_object(current_firm.stripe_connects.last))
        expect(result.dig(:data, :declineStripeConnect, :stripeConnect, :status)).to eq('removed')
        expect(result.dig(:data, :declineStripeConnect, :error)).to be_nil
        expect(result.dig(:data, :declineStripeConnect, :notification)).to eq('Account removed')
      end
    end

    context 'permissions' do
      context 'without current user' do
        let(:current_user) { nil }
        it 'fails' do
          current_firm

          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)
          expect(result.dig(:data, :declineStripeConnect, :stripeConnect)).to be_nil
          expect(result.dig(:data, :declineStripeConnect, :errors)).to include('You are not authorized')
        end
      end

      context 'for temporary user' do
        let(:current_user) { create(:temporary_user) }
        it 'fails' do
          current_firm

          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)
          expect(result.dig(:data, :declineStripeConnect, :stripeConnect)).to be_nil
          expect(result.dig(:data, :declineStripeConnect, :errors)).to include('You are not authorized')
        end
      end

      context 'for inactive user' do
        let(:current_user) { create(:inactive_user) }
        it 'fails' do
          current_firm

          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)
          expect(result.dig(:data, :declineStripeConnect, :stripeConnect)).to be_nil
          expect(result.dig(:data, :declineStripeConnect, :errors)).to include('You are not authorized')
        end
      end

      context 'for common user' do
        let(:current_user) { create(:active_user) }
        it 'fails' do
          current_firm

          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { StripeConnect.count }.by(0)
          expect(result.dig(:data, :declineStripeConnect, :stripeConnect)).to be_nil
          expect(result.dig(:data, :declineStripeConnect, :errors)).to include('You are not authorized')
        end
      end
    end
  end
end
