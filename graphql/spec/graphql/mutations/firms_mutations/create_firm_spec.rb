# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::FirmsMutations::CreateFirm do
  describe 'mutation create firm' do
    let!(:mutation) do
      "
        mutation CreateFirmMutation($input: CreateFirmInput!){
          createFirm(input: $input) {
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

      it 'GraphQL::UnauthorizedError' do
        res = subject.to_h
        expect(res['data']['createFirm']).to eq(nil)
        expect(res['errors']).not_to be_nil
      end
    end

    context 'account already has a firm' do
      subject do
        GraphqlSchema.execute(mutation, variables: {
                                input: {
                                  title: 'The best event'
                                }
                              }, context: { current_user: firm.accounts.last.user })
      end

      let!(:firm) { create(:firm) }

      it 'no firms detected' do
        expect { subject }.to change { Firm.count }.by(0)
      end
    end
  end

  describe 'user has no account' do
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

    let!(:user) { create(:user) }

    subject do
      GraphqlSchema.execute(mutation, variables: {
                              input: {
                                title: 'The best event'
                              }
                            }, context: { current_user: user })
    end

    it 'create firm for user' do
      res = subject.to_h
      expect(res['data']['createFirm']).to eq(nil)
      expect(res['errors']).not_to be_nil
    end
  end
end
