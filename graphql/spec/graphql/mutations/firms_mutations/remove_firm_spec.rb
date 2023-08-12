# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::FirmsMutations::RemoveFirm do
  describe 'remove firm' do
    let!(:mutation) do
      "
        mutation RemoveFirmMutation($input: RemoveFirmInput!) {
          removeFirm(input: $input) {
            firm {
              id
            }
          }
        }
      "
    end
    let!(:firm) { create(:firm) }

    subject do
      GraphqlSchema.execute(mutation,
                            variables: { input: {} },
                            context: { current_user: firm.accounts.first.user })
    end

    it 'firm removed' do
      expect(RemoveFirmJob).to receive(:perform_later).with(firm.id)
      subject
    end
  end
end
