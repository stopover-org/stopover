# frozen_string_literal: true

# == Schema Information
#
# Table name: addresses
#
#  id           :bigint           not null, primary key
#  city         :string
#  country      :string
#  full_address :text
#  house_number :string
#  latitude     :float
#  longitude    :float
#  postal_code  :string
#  region       :string
#  street       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  firm_id      :bigint
#
# Indexes
#
#  index_addresses_on_firm_id  (firm_id)
#
require 'rails_helper'

RSpec.describe Address, type: :model do
  describe 'model setup' do
    it 'constants' do
      expect(Address::DEFAULT_COUNTRY).to eq('Serbia')
      expect(Address::GRAPHQL_TYPE).to eq(Types::FirmsRelated::AddressType)
    end

    it 'relations' do
      should belong_to(:firm).optional(true)

      should have_many(:events)
      should have_many(:accounts)
    end

    it 'validations' do
      should validate_inclusion_of(:country).in_array(ISO3166::Country.all.map(&:iso_short_name))
    end

    it 'callbacks' do
      address = Address.create!

      expect(address.country).to eq('Serbia')
    end
  end
end
