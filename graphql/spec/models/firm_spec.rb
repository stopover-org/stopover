# frozen_string_literal: true

# == Schema Information
#
# Table name: firms
#
#  id                        :bigint           not null, primary key
#  available_payment_methods :string           default([]), not null, is an Array
#  business_type             :string           default("individual"), not null
#  contact_person            :string
#  contacts                  :text
#  contract_address          :string
#  description               :text
#  firm_type                 :string           default("onboarding")
#  language                  :string           default("en")
#  margin                    :integer          default(0)
#  payment_types             :string           default([]), not null, is an Array
#  postal_code               :string
#  primary_email             :string
#  primary_phone             :string
#  ref_number                :string
#  status                    :string           default("pending")
#  title                     :string           not null
#  website                   :string
#  address_id                :bigint
#  stripe_account_id         :string
#
# Indexes
#
#  index_firms_on_address_id  (address_id)
#  index_firms_on_ref_number  (ref_number) UNIQUE
#
require 'rails_helper'

RSpec.describe Firm, type: :model do
  describe 'model setup' do
    subject { create(:firm) }
    it 'constants' do
      expect(Firm::GRAPHQL_TYPE).to eq(Types::FirmsRelated::FirmType)
    end

    it 'relations' do
      should belong_to(:address).optional(true)

      should have_one(:balance).dependent(:nullify)

      should have_many(:account_firms).dependent(:destroy)
      should have_many(:events).dependent(:destroy)
      should have_many(:stripe_connects).dependent(:nullify)
      should have_many(:refunds).dependent(:nullify)
      should have_many(:payouts).dependent(:nullify)
      should have_many(:attendees).dependent(:nullify)
      should have_many(:attendee_options).dependent(:nullify)
      should have_many(:payments).dependent(:nullify)
      should have_many(:addresses).dependent(:destroy)
      should have_many(:event_placements).dependent(:destroy)
      should have_many(:tour_plans).dependent(:destroy)
      should have_many(:tour_places).dependent(:destroy)
      should have_many(:notifications).dependent(:destroy)

      should have_many(:accounts).through(:account_firms)
      should have_many(:bookings).through(:events)
      should have_many(:schedules).through(:events)

      should have_many(:dynamic_translations).dependent(:destroy)
    end

    it 'attachments' do
      should have_one_attached(:image)
    end

    it 'enum' do
      should define_enum_for(:business_type).with_values(
        individual: 'individual',
        company: 'company'
      ).backed_by_column_of_type(:string)
      should define_enum_for(:firm_type).with_values(
        onboarding: 'onboarding',
        live: 'live'
      ).backed_by_column_of_type(:string)
    end

    context 'validations' do
      it 'check' do
        should validate_presence_of(:primary_email)
        should validate_presence_of(:primary_phone)
        should validate_presence_of(:title)

        should validate_uniqueness_of(:ref_number)
      end
    end

    context 'callbacks' do
      it 'create balance' do
        firm = create(:firm)
        expect(firm.balance).not_to be_nil
      end

      it 'default available payment methods' do
        firm = create(:firm, available_payment_methods: [])
        expect(firm.available_payment_methods).to eq(['cash'])
      end
    end
  end

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
