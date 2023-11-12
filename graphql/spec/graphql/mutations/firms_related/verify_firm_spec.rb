# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::FirmsRelated::VerifyFirm, type: :mutation do
  let(:mutation) do
    "
      mutation VerifyFirm($input: VerifyFirmInput!) {
        verifyFirm(input: $input) {
          firm {
            status
          }

          errors
          notification
        }
      }
    "
  end
  let(:current_firm) { create(:firm) }
  let(:current_user) { create(:service_user, with_account: true) }
  let!(:firm_account) { current_user&.account&.account_firms&.create(firm: current_firm) }

  before do
    current_user.account.update!(firm: current_firm) if current_user&.account
  end

  let(:input) { {} }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  context 'verify firm' do
    it 'send notification to firm owner' do
      expect { subject }.to change { Notification.where(to: current_firm.primary_email).count }.by(1)
    end

    it 'check pending firm' do
      expect(current_firm.status).to eq('pending')
    end

    it 'execute mutation success' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)

      expect(current_firm.reload.status).to eq('active')

      expect(result.dig(:data, :verifyFirm, :firm, :status)).to eq('active')
      expect(result.dig(:data, :verifyFirm, :error)).to be_nil
      expect(result.dig(:data, :verifyFirm, :notification)).to eq('Firm verified')
    end

    context 'permissions' do
      context 'already active' do
        before { current_firm.update(status: 'active') }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)

          expect(result.dig(:data, :verifyFirm, :firm)).to be_nil
          expect(result.dig(:data, :verifyFirm, :errors)).to include('Something went wrong')
          expect(result.dig(:data, :verifyFirm, :notification)).to be_nil
        end
      end

      context 'without current user' do
        let(:current_user) { nil }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
          expect(result.dig(:data, :verifyFirm, :firm)).to be_nil
          expect(result.dig(:data, :verifyFirm, :errors)).to include('You are not authorized')
        end
      end

      context 'for temporary user' do
        let(:current_user) { create(:temporary_user) }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
          expect(result.dig(:data, :verifyFirm, :firm)).to be_nil
          expect(result.dig(:data, :verifyFirm, :errors)).to include('You are not authorized')
        end
      end

      context 'for inactive user' do
        let(:current_user) { create(:inactive_user) }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
          expect(result.dig(:data, :verifyFirm, :firm)).to be_nil
          expect(result.dig(:data, :verifyFirm, :errors)).to include('You are not authorized')
        end
      end

      context 'for common user' do
        let(:current_user) { create(:active_user) }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
          expect(result.dig(:data, :verifyFirm, :firm)).to be_nil
          expect(result.dig(:data, :verifyFirm, :errors)).to include('You are not authorized')
        end
      end
    end
  end
end
