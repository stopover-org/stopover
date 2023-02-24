# frozen_string_literal: true

# == Schema Information
#
# Table name: stripe_integrations
#
#  id              :bigint           not null, primary key
#  name            :string
#  stripeable_type :string
#  unit_amount     :decimal(, )
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  price_id        :string
#  product_id      :string
#  stripeable_id   :bigint
#
# Indexes
#
#  index_stripe_integrations_on_stripeable_id_and_stripeable_type  (stripeable_id,stripeable_type)
#
require 'rails_helper'

RSpec.describe StripeIntegration, type: :model do
  describe 'stripe integration' do
    let!(:event) { create(:event) }
    it 'created' do
      StripeIntegrator.sync(event)
      expect(StripeIntegration.count).to eq(1)
    end
  end
end
