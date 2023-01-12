# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateFirm do
  describe '' do
    let!(:mutation) do
      "
        mutation UpdateFirmMutation($input: UpdateFirmInput!) {
          updateFirm(input:  $input) {
            firm {
              id
              city
              contactPerson
              contacts
              description
              fullAddress
              houseNumber
              latitude
              longitude
              primaryEmail
              primaryPhone
              region
              street
              title
              website
            }
          }
        }
      "
    end
    let!(:firm) { create(:firm) }

    subject do
      GraphqlSchema.execute(mutation, variables: {
                              input: {
                                title: 'New best event'
                              }
                            }, context: { current_user: firm.accounts.first.user })
    end

    it 'title changes' do
      res = subject.to_h
      expect(res.dig('data', 'updateFirm', 'firm', 'title')).to eq('New best event')
    end

    context 'no firm' do
      let!(:account) { create(:account) }

      subject do
        GraphqlSchema.execute(mutation, variables: {
                                input: {
                                  title: 'New best event'
                                }
                              }, context: { current_user: account.user })
      end

      it 'trying to update with no firm' do
        res = subject.to_h
        expect(res['data']['updateFirm']).to eq(nil)
        expect(res['errors']).not_to be_nil
      end
    end

    context 'no account' do
      subject do
        GraphqlSchema.execute(mutation, variables: {
                                input: {
                                  title: 'New best event'
                                }
                              })
      end

      it 'trying to update with no account' do
        res = subject.to_h
        expect(res['data']['updateFirm']).to eq(nil)
        expect(res['errors']).not_to be_nil
      end
    end
  end
end
