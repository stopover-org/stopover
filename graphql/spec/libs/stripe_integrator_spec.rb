# frozen_string_literal: true

# == Schema Information
#
# Table name: stripe_integrations
#
#  id              :bigint           not null, primary key
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
  describe 'stripe integration' do
    let!(:event) { create(:event, organizer_price_per_uom: Money.new(20)) }
    it 'created' do
      expect(Stripe::Product).to receive(:create).with({ name: event.title }).and_return({ id: 'temp_product_id' })
      expect(Stripe::Price).to receive(:create).with({ unit_amount_decimal: 22,
                                                      product: 'temp_product_id',
                                                      currency: :usd,
                                                      billing_scheme: 'per_unit' }).and_return({ id: 'temp_price_id' })
      StripeIntegrator.sync(event)
      expect(event.stripe_integration.product_id).to eq('temp_product_id')
      expect(event.stripe_integration.price_id).to eq('temp_price_id')
    end

    context 'delete' do
      let!(:event) { create(:stripe_integration_factory) }
      it 'product and price' do
        expect(Stripe::Price).to receive(:update).with(event.stripe_integration.price_id, { active: false }).and_return(price: { id: 'price_active_false' })
        expect(Stripe::Product).to receive(:update).with(event.stripe_integration.product_id, { active: false }).and_return(product: { id: 'product_active_false' })
        expect(StripeIntegrator.delete(event)).to eq({ product: { id: 'product_active_false' } })
      end
      let!(:event_no_stripe) { create(:event) }
      it 'no stripe_integration' do
        expect(event_no_stripe.stripe_integration).to eq(nil)
        expect(StripeIntegrator.delete(event_no_stripe)).to eq(nil)
      end
    end

    context 'retrieve' do
      let!(:event) { create(:stripe_integration_factory) }
      it 'price and product' do
        expect(Stripe::Price).to receive(:retrieve).with(id: event.stripe_integration.price_id).and_return('price')
        expect(Stripe::Product).to receive(:retrieve).with(id: event.stripe_integration.product_id).and_return('product')
        expect(StripeIntegrator.retrieve(event)).to eq({ product: 'product', price: 'price' })
      end
    end
  end
end
