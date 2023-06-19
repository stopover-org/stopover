# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                :bigint           not null, primary key
#  confirmation_code :string
#  confirmed_at      :datetime
#  disabled_at       :datetime
#  email             :string
#  last_try          :datetime
#  phone             :string
#  service_user      :boolean          default(FALSE)
#  session_password  :string
#  status            :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#  index_users_on_phone  (phone) UNIQUE
#
require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'create user from scratch' do
    before(:each) do
      allow(Stopover::SmsProvider).to receive(:send_sms)
      allow(Stopover::MailProvider).to receive(:send_mail)
    end

    let(:user) { create(:user) }
    let(:primary_method) { 'phone' }
    subject { user.send_confirmation_code!(primary: primary_method) }

    shared_examples :sign_in do
      it 'sending confirmation code' do
        expect(user.confirmation_code).to be(nil)
        expect(user.last_try).to be(nil)
        expect(user.status).to eq('inactive')
        subject
        expect(user.confirmation_code.length).to be(5)
      end

      it 'activation' do
        subject
        expect(user.confirmation_code.length).to be(5)
        user.activate!(code: user.confirmation_code)
        expect(user.confirmation_code).to be(nil)
        expect(user.status).to eq('active')
      end

      it 'should send notifications' do
        subject
        # if primary_method == 'phone'
        #   expect(Stopover::SmsProvider).to receive(:send_sms)
        # elsif primary_method == 'email'
        #   expect(Stopover::MailProvider).to receive(:send_mail)
        # end
      end
    end

    context 'by email' do
      let(:user) { create(:user, email: 'example@example.com') }
      let(:primary_method) { 'email' }
      include_examples :sign_in
    end

    context 'by phone' do
      let(:user) { create(:user, phone: '+79999999999') }
      let(:primary_method) { 'phone' }
      include_examples :sign_in
    end
  end
end
