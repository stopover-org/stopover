# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::FirmsRelated::CreateFirm, type: :mutation do
  let(:mutation) do
    "
      mutation CreateFirm($input: CreateFirmInput!) {
        createFirm(input: $input) {
          firm {
            id
            title
            description
            status
            paymentTypes
            image

            primaryPhone
            primaryEmail
            contactPerson
            contacts
          }
          errors
          notification
        }
      }
    "
  end
  let(:current_user) { create(:active_user, with_account: true) }
  let(:input) do
    {
      title: 'New Firm',
      paymentTypes: %w[Cash Stripe],
      primaryEmail: 'some@mail.com'
    }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  context 'create new firm' do
    it 'send notification to firm owner' do
      expect { subject }.to change { Notification.where(to: input[:primaryEmail]).count }.by(1)
    end

    it 'successfully' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(1)

      firm = Firm.last

      expect(result.dig(:data, :createFirm, :firm, :id)).to eq(GraphqlSchema.id_from_object(Firm.last))
      expect(result.dig(:data, :createFirm, :firm, :title)).to eq(firm.title)
      expect(result.dig(:data, :createFirm, :firm, :description)).to eq(firm.description)
      expect(result.dig(:data, :createFirm, :firm, :image)).to_not be_nil
      expect(result.dig(:data, :createFirm, :firm, :status)).to eq('pending')
      expect(result.dig(:data, :createFirm, :firm, :paymentTypes)).to eq(firm.payment_types)
      expect(result.dig(:data, :createFirm, :firm, :primaryEmail)).to eq(firm.primary_email)
      expect(result.dig(:data, :createFirm, :firm, :primaryPhone)).to eq(firm.primary_phone)

      expect(result.dig(:data, :createFirm, :firm, :title)).to eq('New Firm')
      expect(result.dig(:data, :createFirm, :firm, :paymentTypes)).to eq(%w[Cash Stripe])
      expect(result.dig(:data, :createFirm, :firm, :primaryEmail)).to eq('some@mail.com')

      expect(result.dig(:data, :createFirm, :notification)).to eq('Firm created')
    end
  end

  context 'validations' do
    context 'invalid email' do
      it 'fails' do
        input[:primaryEmail] = 'WRONG EMAIL'
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :createFirm, :firm)).to be_nil
        expect(result.dig(:data, :createFirm, :errors)).to_not be_empty
      end
    end
  end

  context 'permission' do
    context 'with existing firm' do
      let(:firm) { create(:firm) }
      before do
        firm.account_firms << current_user.account.account_firms.build
        current_user.account.update!(firm: firm)
      end
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :createFirm, :firm)).to be_nil
        expect(result.dig(:data, :createFirm, :errors)).to include('Something went wrong')
      end
    end

    context 'without current user' do
      let(:current_user) { nil }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :createFirm, :firm)).to be_nil
        expect(result.dig(:data, :createFirm, :errors)).to include('You are not authorized')
      end
    end

    context 'for temporary user' do
      let(:current_user) { create(:temporary_user) }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :createFirm, :firm)).to be_nil
        expect(result.dig(:data, :createFirm, :errors)).to include('You are not authorized')
      end
    end

    context 'for inactive user' do
      let(:current_user) { create(:inactive_user) }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :createFirm, :firm)).to be_nil
        expect(result.dig(:data, :createFirm, :errors)).to include('You are not authorized')
      end
    end
  end
end
