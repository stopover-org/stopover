# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::FirmsRelated::InviteUser, type: :mutation do
  let(:mutation) do
    "
      mutation InviteUser($input: InviteUserInput!) {
        inviteUser(input: $input) {
          account {
            status
            user {
              status
            }
          }
          errors
          notification
        }
      }
    "
  end
  let(:firm) { create(:firm) }
  let(:current_user) { firm.accounts.last.user }
  let(:input) { { email: Faker::Internet.email } }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  context 'user invited' do
    it 'send notification to firm owner' do
      expect { subject }.to change { Notification.where(to: firm.primary_email).count }.by(1)
    end

    it 'send notification to invited user' do
      expect { subject }.to change { Notification.where(to: input[:email]).count }.by(1)
    end

    it 'successfully' do
      firm
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(1)

      user = User.last

      expect(user.status).to eq('active')

      expect(result.dig(:data, :inviteUser, :account, :status)).to eq('initial')
      expect(result.dig(:data, :inviteUser, :account, :user, :status)).to eq('active')
      expect(result.dig(:data, :inviteUser, :notification)).to eq('Invitation was sent')
    end
  end

  context 'invite already invited user' do
    let(:user) { create(:active_user, with_account: true) }
    before do
      firm.account_firms.create(account: user.account)
    end
    let(:input) { { email: user.email } }
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
      expect(result.dig(:data, :inviteUser, :account)).to be_nil
      expect(result.dig(:data, :inviteUser, :errors)).to include('User already invited')
    end
  end

  context 'permission' do
    context 'user don\'t have firm' do
      let(:current_user) { create(:active_user, with_account: true) }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :inviteUser, :account)).to be_nil
        expect(result.dig(:data, :inviteUser, :errors)).to include('You are not authorized')
      end
    end

    context 'without current user' do
      let(:current_user) { nil }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :inviteUser, :account)).to be_nil
        expect(result.dig(:data, :inviteUser, :errors)).to include('You are not authorized')
      end
    end

    context 'for temporary user' do
      let(:current_user) { create(:temporary_user) }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :inviteUser, :account)).to be_nil
        expect(result.dig(:data, :inviteUser, :errors)).to include('You are not authorized')
      end
    end

    context 'for inactive user' do
      let(:current_user) { create(:inactive_user) }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :inviteUser, :account)).to be_nil
        expect(result.dig(:data, :inviteUser, :errors)).to include('You are not authorized')
      end
    end

    context 'for removed firm' do
      before do
        firm.update_columns(status: :removed)
      end
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :inviteUser, :account)).to be_nil
        expect(result.dig(:data, :inviteUser, :errors)).to include('You are not authorized')
      end
    end
  end
end
