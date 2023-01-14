# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Firm, type: :model do
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
      GraphqlSchema.execute(mutation, variables: {
                              input: {
                                firm: {
                                  id: firm.id
                                }
                              }
                            }, context: { current_user: firm.accounts.first.user })
    end

    it 'firm deleted' do
      expect(RemoveFirmJob).to receive(:perform_later).with(firm.id)
    end
  end
end
