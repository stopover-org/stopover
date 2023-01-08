# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateFirm do
  describe 'mutation create firm' do
    let!(:mutation) do
      "
        mutation CreateFirmMutation($input: CreateFirmInput!){
          createFirm(input:$input) {
            firm {
              title
              primaryEmail
              primaryPhone
            }
          }
        }
      "
    end
    let!(:account) { create(:account) }

    subject do
      GraphqlSchema.execute(mutation, variables: {
                              input: {
                                title: 'The best event',
                                primaryEmail: Faker::Internet.email,
                                primaryPhone: Faker::PhoneNumber.phone_number
                              }
                            }, context: { current_user: account.user })
    end

    it 'was created' do
      expect { subject }.to change { Firm.count }.by(1)
      expect(Firm.last.accounts.count).to eq(1)
    end

    context 'creates automatically' do
      subject do
        GraphqlSchema.execute(mutation, variables: {
                                input: {
                                  title: 'The best event'
                                }
                              }, context: { current_user: account.user })
      end

      it 'correct email and phone number' do
        expect { subject }.to change { Firm.count }.by(1)
        expect(Firm.last.primary_email).to eq(account.user.email)
        expect(Firm.last.primary_phone).to eq(account.primary_phone)
      end
    end

    context 'creates firm without user' do
      subject do
        GraphqlSchema.execute(mutation, variables: {
                                input: {
                                  title: 'The best event'
                                }
                              })
      end

      it '' do
        expect { subject }.to raise_exception('not authorized')
      end
    end
  end
end
