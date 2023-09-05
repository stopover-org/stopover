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

            country
            city
            region
            street
            houseNumber
            fullAddress
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
      country: 'Serbia',
      city: 'Београд',
      street: 'Street Name',
      houseNumber: 'House Number',
      fullAddress: 'Full Address',

      image: 'https://placehold.co/600x400/EEE/31343C',

      title: 'New Firm',
      description: 'description',
      paymentTypes: %w[Cash Stripe],
      primaryPhone: '+381 621 496 696',
      primaryEmail: 'some@mail.com',
      contactPerson: 'Contact Person'
    }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  context 'create new firm' do
    it 'successfully' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(1)

      firm = Firm.last

      expect(result.dig(:data, :createFirm, :firm, :id)).to           eq(GraphqlSchema.id_from_object(Firm.last))
      expect(result.dig(:data, :createFirm, :firm, :title)).to        eq(firm.title)
      expect(result.dig(:data, :createFirm, :firm, :description)).to  eq(firm.description)
      expect(result.dig(:data, :createFirm, :firm, :image)).to_not    be_nil
      expect(result.dig(:data, :createFirm, :firm, :status)).to       eq('pending')
      expect(result.dig(:data, :createFirm, :firm, :paymentTypes)).to eq(firm.payment_types)
      expect(result.dig(:data, :createFirm, :firm, :primaryEmail)).to eq(firm.primary_email)
      expect(result.dig(:data, :createFirm, :firm, :primaryPhone)).to eq(firm.primary_phone)

      expect(result.dig(:data, :createFirm, :firm, :country)).to      eq(firm.country)
      expect(result.dig(:data, :createFirm, :firm, :city)).to         eq(firm.city)
      expect(result.dig(:data, :createFirm, :firm, :street)).to       eq(firm.street)
      expect(result.dig(:data, :createFirm, :firm, :houseNumber)).to  eq(firm.house_number)
      expect(result.dig(:data, :createFirm, :firm, :fullAddress)).to  eq(firm.full_address)

      expect(result.dig(:data, :createFirm, :firm, :title)).to        eq('New Firm')
      expect(result.dig(:data, :createFirm, :firm, :description)).to  eq('description')
      expect(result.dig(:data, :createFirm, :firm, :paymentTypes)).to eq(%w[Cash Stripe])
      expect(result.dig(:data, :createFirm, :firm, :primaryEmail)).to eq('some@mail.com')
      expect(result.dig(:data, :createFirm, :firm, :primaryPhone)).to eq('+381621496696')

      expect(result.dig(:data, :createFirm, :firm, :country)).to      eq('Serbia')
      expect(result.dig(:data, :createFirm, :firm, :city)).to         eq('Београд')
      expect(result.dig(:data, :createFirm, :firm, :street)).to       eq('Street Name')
      expect(result.dig(:data, :createFirm, :firm, :houseNumber)).to  eq('House Number')
      expect(result.dig(:data, :createFirm, :firm, :fullAddress)).to  eq('Full Address')

      expect(result.dig(:data, :createFirm, :notification)).to eq('Firm was created')
    end
  end

  context 'validations' do
    context 'address' do
      context 'invalid country' do
        it 'fails' do
          input[:country] = 'WRONG COUNTRY'
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
          expect(result.dig(:data, :createFirm, :firm)).to be_nil
          expect(result.dig(:data, :createFirm, :errors)).to_not be_empty
          expect(result.dig(:data, :createFirm, :notification)).to eq('Something went wrong')
        end
      end
    end

    context 'invalid phone' do
      it 'fails' do
        input[:primaryPhone] = 'WRONG PHONE'
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :createFirm, :firm)).to be_nil
        expect(result.dig(:data, :createFirm, :errors)).to_not be_empty
        expect(result.dig(:data, :createFirm, :notification)).to eq('Something went wrong')
      end
    end

    context 'invalid email' do
      it 'fails' do
        input[:primaryEmail] = 'WRONG EMAIL'
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :createFirm, :firm)).to be_nil
        expect(result.dig(:data, :createFirm, :errors)).to_not be_empty
        expect(result.dig(:data, :createFirm, :notification)).to eq('Something went wrong')
      end
    end
  end

  context 'permission' do
    context 'with existing firm' do
      let(:firm) { create(:firm) }
      before { firm.account_firms << current_user.account.account_firms.build }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :createFirm, :firm)).to be_nil
        expect(result.dig(:data, :createFirm, :errors)).to include('You already have firm')
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
