# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::FirmsRelated::UpdateFirm, type: :mutation do
  let(:mutation) do
    "
      mutation UpdateFirm($input: UpdateFirmInput!) {
        updateFirm(input: $input) {
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

            address {
              country
              city
              region
              street
              houseNumber
              fullAddress
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

  context 'update firm' do
    it 'successfully' do
      firm
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)

      firm = Firm.last

      expect(result.dig(:data, :updateFirm, :firm, :id)).to eq(GraphqlSchema.id_from_object(Firm.last))
      expect(result.dig(:data, :updateFirm, :firm, :title)).to eq(firm.title)
      expect(result.dig(:data, :updateFirm, :firm, :description)).to eq(firm.description)
      expect(result.dig(:data, :updateFirm, :firm, :image)).to_not be_nil
      expect(result.dig(:data, :updateFirm, :firm, :status)).to eq('active')
      expect(result.dig(:data, :updateFirm, :firm, :paymentTypes)).to eq(firm.payment_types)
      expect(result.dig(:data, :updateFirm, :firm, :primaryEmail)).to eq(firm.primary_email)
      expect(result.dig(:data, :updateFirm, :firm, :primaryPhone)).to eq(firm.primary_phone)

      expect(result.dig(:data, :updateFirm, :firm, :address, :country)).to eq(firm.address.country)
      expect(result.dig(:data, :updateFirm, :firm, :address, :city)).to eq(firm.address.city)
      expect(result.dig(:data, :updateFirm, :firm, :address, :street)).to eq(firm.address.street)
      expect(result.dig(:data, :updateFirm, :firm, :address, :houseNumber)).to eq(firm.address.house_number)
      expect(result.dig(:data, :updateFirm, :firm, :address, :fullAddress)).to eq(firm.address.full_address)

      expect(result.dig(:data, :updateFirm, :firm, :title)).to eq('New Firm')
      expect(result.dig(:data, :updateFirm, :firm, :description)).to eq('description')
      expect(result.dig(:data, :updateFirm, :firm, :paymentTypes)).to eq(%w[Cash Stripe])
      expect(result.dig(:data, :updateFirm, :firm, :primaryEmail)).to eq('some@mail.com')
      expect(result.dig(:data, :updateFirm, :firm, :primaryPhone)).to eq('+381621496696')

      expect(result.dig(:data, :updateFirm, :firm, :address, :country)).to eq('Serbia')
      expect(result.dig(:data, :updateFirm, :firm, :address, :city)).to eq('Београд')
      expect(result.dig(:data, :updateFirm, :firm, :address, :street)).to eq('Street Name')
      expect(result.dig(:data, :updateFirm, :firm, :address, :houseNumber)).to eq('House Number')
      expect(result.dig(:data, :updateFirm, :firm, :address, :fullAddress)).to eq('Full Address')

      expect(result.dig(:data, :updateFirm, :notification)).to eq('Firm updated')
    end
  end

  context 'validations' do
    context 'address' do
      context 'invalid country' do
        it 'fails' do
          firm
          input[:country] = 'WRONG COUNTRY'
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
          expect(result.dig(:data, :updateFirm, :firm)).to be_nil
          expect(result.dig(:data, :updateFirm, :errors)).to_not be_empty
        end
      end
    end

    context 'invalid email' do
      it 'fails' do
        firm
        input[:primaryEmail] = 'WRONG EMAIL'
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :updateFirm, :firm)).to be_nil
        expect(result.dig(:data, :updateFirm, :errors)).to_not be_empty
      end
    end
  end

  context 'permission' do
    context 'user don\'t have firm' do
      let(:current_user) { create(:active_user, with_account: true) }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :updateFirm, :firm)).to be_nil
        expect(result.dig(:data, :updateFirm, :errors)).to include('You are not authorized')
      end
    end

    context 'without current user' do
      let(:current_user) { nil }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :updateFirm, :firm)).to be_nil
        expect(result.dig(:data, :updateFirm, :errors)).to include('You are not authorized')
      end
    end

    context 'for temporary user' do
      let(:current_user) { create(:temporary_user) }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :updateFirm, :firm)).to be_nil
        expect(result.dig(:data, :updateFirm, :errors)).to include('You are not authorized')
      end
    end

    context 'for inactive user' do
      let(:current_user) { create(:inactive_user) }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Firm.count }.by(0)
        expect(result.dig(:data, :updateFirm, :firm)).to be_nil
        expect(result.dig(:data, :updateFirm, :errors)).to include('You are not authorized')
      end
    end
  end
end
