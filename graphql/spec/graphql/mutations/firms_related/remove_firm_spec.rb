# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::FirmsRelated::RemoveFirm, type: :mutation do
  let(:mutation) do
    "
      mutation RemoveFirm($input: RemoveFirmInput!) {
        removeFirm(input: $input) {
          firm {
            status
          }
          errors
          notification
        }
      }
    "
  end
  let(:firm) { create(:firm) }
  let(:current_user) { firm.accounts.last.user }
  let(:input) { {} }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  context 'remove firm' do
    it 'successfully' do
      result = nil
      firm
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)

      firm = Firm.last

      expect(firm.status).to eq('removed')

      expect(result.dig(:data, :removeFirm, :firm, :status)).to eq('removed')
      expect(result.dig(:data, :removeFirm, :notification)).to eq('Firm was removed')
    end
  end

  context 'permission' do
    context 'user don\'t have firm' do
      let(:current_user) { create(:active_user, with_account: true) }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :removeFirm, :firm)).to be_nil
        expect(result.dig(:data, :removeFirm, :errors)).to include('You don\'t have firm')
      end
    end

    context 'without current user' do
      let(:current_user) { nil }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :removeFirm, :firm)).to be_nil
        expect(result.dig(:data, :removeFirm, :errors)).to include('You are not authorized')
      end
    end

    context 'for temporary user' do
      let(:current_user) { create(:temporary_user) }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :removeFirm, :firm)).to be_nil
        expect(result.dig(:data, :removeFirm, :errors)).to include('You are not authorized')
      end
    end

    context 'for inactive user' do
      let(:current_user) { create(:inactive_user) }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :removeFirm, :firm)).to be_nil
        expect(result.dig(:data, :removeFirm, :errors)).to include('You are not authorized')
      end
    end

    context 'for removed firm' do
      before do
        firm.update_columns(status: :removed)
      end
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :removeFirm, :firm)).to be_nil
        expect(result.dig(:data, :removeFirm, :errors)).to include("You don't have firm")
      end
    end
  end
end
