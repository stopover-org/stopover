# frozen_string_literal: true

# == Schema Information
#
# Table name: firms
#
#  id                :bigint           not null, primary key
#  business_type     :string           default("individual"), not null
#  contact_person    :string
#  contacts          :text
#  contract_address  :string
#  description       :text
#  margin            :integer          default(0)
#  payment_types     :string           default([]), not null, is an Array
#  postal_code       :string
#  primary_email     :string
#  primary_phone     :string
#  ref_number        :string
#  status            :string           default("pending")
#  title             :string           not null
#  website           :string
#  address_id        :bigint
#  stripe_account_id :string
#
# Indexes
#
#  index_firms_on_address_id  (address_id)
#  index_firms_on_ref_number  (ref_number) UNIQUE
#
require 'rails_helper'

RSpec.describe Firm, type: :model do
  describe 'firm' do
    let!(:firm) { create(:firm) }
    let!(:event) { create_list(:recurring_event, 10, firm_id: firm.id) }

    it 'was removed' do
      expect(RemoveFirmJob).to receive(:perform_later).with(firm.id)
      firm.remove!
      expect(firm.status).to eq('removed')
    end
  end
end
