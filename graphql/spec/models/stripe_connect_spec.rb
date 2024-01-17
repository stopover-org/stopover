# frozen_string_literal: true

# == Schema Information
#
# Table name: stripe_connects
#
#  id                :bigint           not null, primary key
#  activated_at      :datetime
#  status            :string           default("pending"), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  firm_id           :bigint           not null
#  stripe_connect_id :string
#
# Indexes
#
#  index_stripe_connects_on_firm_id  (firm_id)
#
require 'rails_helper'

RSpec.describe StripeConnect, type: :model do
  describe 'model setup' do
    it 'constants' do
      expect(StripeConnect::GRAPHQL_TYPE).to eq(Types::FirmsRelated::StripeConnectType)
    end
    it 'relations' do
      should belong_to(:firm)
    end
    context 'validations' do
      it 'check' do
        should validate_presence_of(:status)
      end
    end
  end
end
