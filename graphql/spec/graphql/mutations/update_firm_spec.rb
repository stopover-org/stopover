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

    it '' do
      res = subject.to_h
      expect(res.dig('data', 'updateFirm', 'firm', 'title')).to eq('New best event')
    end
  end
end
