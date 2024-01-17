# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts
#
#  id            :bigint           not null, primary key
#  date_of_birth :datetime
#  language      :string           default("en"), not null
#  name          :string
#  phones        :string           default([]), is an Array
#  primary_email :string
#  primary_phone :string
#  status        :string           default("initial"), not null
#  verified_at   :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  address_id    :bigint
#  firm_id       :bigint
#  user_id       :bigint
#
# Indexes
#
#  index_accounts_on_address_id  (address_id)
#  index_accounts_on_firm_id     (firm_id)
#  index_accounts_on_user_id     (user_id) UNIQUE
#
require 'rails_helper'

RSpec.describe Account, type: :model do
  describe 'model setup' do
    it 'relations' do
      should have_many(:account_interests).dependent(:destroy)
      should have_many(:trips).dependent(:destroy)
      should have_many(:account_firms).dependent(:destroy)
      should have_many(:ratings).dependent(:nullify)
      should have_many(:refunds).dependent(:nullify)

      should have_many(:interests).through(:account_interests)
      should have_many(:bookings).through(:trips)
      should have_many(:firms).through(:account_firms)

      should belong_to(:user).optional(false)
      should belong_to(:firm).optional(true)
    end

    it 'enums' do
      should define_enum_for(:language).with_values(ru: 'ru',
                                                    en: 'en')
                                       .backed_by_column_of_type(:string)
    end

    it 'monetize' do
      # PASS
    end

    context 'validation' do
      subject { account }

      context 'for temporary user' do
        let(:account) { Account.new(user: create(:temporary_user)) }
        it 'validate name presence' do
          should validate_presence_of(:language)
        end
      end

      context 'for active user' do
        let(:account) { Account.new(user: create(:active_user)) }
        it 'validate name presence' do
          should validate_presence_of(:language)
        end
      end

      context 'for inactive user' do
        let(:account) { Account.new(user: create(:inactive_user)) }
        it 'validate name presence' do
          should validate_presence_of(:language)
        end
      end

      context 'for disabled user' do
        let(:account) { Account.new(user: create(:user, status: 'disabled')) }
        it 'validate name presence' do
          should validate_presence_of(:language)
        end
      end
    end

    context 'callbacks' do
      let(:user) { create(:user) }
      let(:account) { create(:account, user: user) }

      context 'with user' do
        it 'set_user_info' do
          expect_any_instance_of(Account).to receive(:adjust_user_info).exactly(4)
                                                                       .times.and_call_original

          account.update_columns(primary_email: nil, primary_phone: nil, phones: [])
          user.update_columns(email: 'user@mail.com', phone: '+995591088783')
          expect(account.primary_phone).to eq(nil)
          expect(account.primary_email).to eq(nil)
          expect(account.phones).to eq([])

          account.save!

          expect(account.primary_phone).to eq('+995591088783')
          expect(account.primary_email).to eq('user@mail.com')
          expect(account.phones).to eq(['+995591088783'])

          account.save!

          expect(account.primary_phone).to eq('+995591088783')
          expect(account.primary_email).to eq('user@mail.com')
          expect(account.phones).to eq(['+995591088783'])

          user.update_columns(email: 'user2@mail.com', phone: '+995591022788')

          account.save!

          expect(account.primary_phone).to eq('+995591022788')
          expect(account.primary_email).to eq('user2@mail.com')
          expect(account.phones).to eq(%w[+995591088783 +995591022788])
        end
      end
    end

    describe 'instance methods' do
      let(:user) { create(:active_user) }
      let(:account) { create(:account, user: user) }
      context 'current_trip' do
        let(:trip) { create(:trip, account: account) }
        it 'with trips' do
          trip
          expect(account.current_trip).to eq(trip)
        end

        it 'without trips' do
          expect(account.current_trip).to be_nil
        end
      end
      context 'current_firm' do
        let(:firm) { create(:firm, accounts: [account]) }
        it 'with firms' do
          firm
          expect(account.current_firm).to eq(firm)
        end

        it 'without firms' do
          expect(account.current_firm).to be_nil
        end
      end
    end
  end
end
