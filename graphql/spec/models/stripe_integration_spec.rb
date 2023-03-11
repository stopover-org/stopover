# frozen_string_literal: true

# == Schema Information
#
# Table name: stripe_integrations
#
#  id              :bigint           not null, primary key
#  price_type      :string
#  status          :string
#  stripeable_type :string
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
  before do
    ::Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'true')
  end
  describe 'stripe integration' do
    let!(:event) { create(:event) }
    it 'created' do
      StripeIntegrator.sync(event)

      expect(StripeIntegration.count).to eq(3)
    end

    context 'methods' do
      let!(:event) { create(:stripe_integration_factory) }
      it 'name and unit_amount' do
        expect(event.stripe_integrations.first.name).to eq(event.title)
        expect(event.stripe_integrations.first.unit_amount).to eq(event.attendee_price_per_uom)
      end
    end
  end
end
