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

RSpec.describe StripeIntegrator, type: :model do
  describe 'stripe integrator' do
    let!(:event) { create(:event, organizer_price_per_uom: Money.new(20), prepaid_amount: Money.new(5)) }
    it 'is created and product_id and price_id eq Stripe ids' do
      ::Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'true')

      expect(Stripe::Product).to receive(:create).with({ name: event.title }).and_return({ id: 'product_id' })
      expect(Stripe::Price).to receive(:create).with({ unit_amount_decimal: 22,
                                                       product: 'product_id',
                                                       currency: :usd,
                                                       billing_scheme: 'per_unit' })
                                               .and_return({ id: 'price_id1' })
      expect(Stripe::Product).to receive(:retrieve).with(id: 'product_id').and_return({ id: 'product_id' }).exactly(2).times
      expect(Stripe::Price).to receive(:create).with({ unit_amount_decimal: 5,
                                                       product: 'product_id',
                                                       currency: :usd,
                                                       billing_scheme: 'per_unit' })
                                               .and_return({ id: 'price_id2' })
      expect(Stripe::Price).to receive(:create).with({ unit_amount_decimal: 17,
                                                       product: 'product_id',
                                                       currency: :usd,
                                                       billing_scheme: 'per_unit' })
                                               .and_return({ id: 'price_id3' })

      StripeIntegrator.sync(event)

      event.stripe_integrations.each do |stripe_integration|
        expect(stripe_integration.product_id).to eq('product_id')
      end

      expect(event.stripe_integrations.count).to eq(3)
      expect(event.stripe_integrations.first.price_id).to eq('price_id1')
      expect(event.stripe_integrations.second.price_id).to eq('price_id2')
      expect(event.stripe_integrations.third.price_id).to eq('price_id3')
    end

    context 'delete' do
      let!(:event) { create(:stripe_integration_factory) }
      it 'product and price. Active changing and ids returned' do
        ::Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'true')
        event.stripe_integrations.each do |stripe_integration|
          expect(Stripe::Price).to receive(:update).with(stripe_integration.price_id, { active: false }).and_return(price: { id: stripe_integration.price_id }).exactly(1).time
        end
        expect(Stripe::Product).to receive(:update).with(event.stripe_integrations.first.product_id, { active: false }).and_return(product: { id: 'product_id' }).exactly(1).time
        StripeIntegrator.delete(event)
        event.reload.stripe_integrations.each do |stripe_integration|
          expect(stripe_integration.status).to eq('deleted')
        end
      end
      let!(:event_no_stripe) { create(:event) }
      it 'model has no stripe integration, method rescued' do
        ::Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'true')
        expect(event_no_stripe.stripe_integrations).to match_array([])
        expect(StripeIntegrator.delete(event_no_stripe)).to eq({
                                                                 product_id: nil,
                                                                 price_ids: nil
                                                               })
      end
    end

    context 'retrieve' do
      let!(:event) { create(:stripe_integration_factory) }
      it 'price and product and stripe integrator returns two models' do
        ::Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'true')
        event.stripe_integrations.each do |stripe_integration|
          expect(Stripe::Price).to receive(:retrieve).with(id: stripe_integration.price_id).and_return('price').exactly(1).time
        end
        expect(Stripe::Product).to receive(:retrieve).with(id: event.stripe_integrations.first.product_id).and_return('product').exactly(1).time
        expect(StripeIntegrator.retrieve(event)).to eq({ product: 'product', prices: {
                                                         full_amount: 'price',
                                                         prepaid_amount: 'price',
                                                         remaining_amount: 'price'
                                                       } })
      end
    end

    context 'update' do
      let!(:event) { create(:stripe_integration_factory, organizer_price_per_uom: Money.new(10)) }
      it 'update' do
        ::Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'true')
        event.update(title: 'new_title', organizer_price_per_uom: Money.new(10), prepaid_amount: Money.new(5))
        expect(Stripe::Product).to receive(:retrieve).with(id: 'product_id').and_return({ id: 'product_id', name: 'product_name' }).exactly(3).time
        expect(Stripe::Price).to receive(:retrieve).with(id: 'price_id_full_amount').and_return({ unit_amount: 22 }).exactly(3).time
        expect(Stripe::Price).to receive(:retrieve).with(id: 'price_id_prepaid_amount').and_return({ unit_amount: 10 }).exactly(3).time
        expect(Stripe::Price).to receive(:retrieve).with(id: 'price_id_remaining_amount').and_return({ unit_amount: 12 }).exactly(3).time

        expect(Stripe::Product).to receive(:update).with({ id: 'product_id', name: 'new_title' }).and_return(product: { id: 'product_id' }).exactly(3).time
        expect(Stripe::Price).to receive(:update).with({ id: 'price_id_full_amount', unit_amount: 11 }).and_return(price: { id: 'price_id' }).exactly(1).time
        expect(Stripe::Price).to receive(:update).with({ id: 'price_id_prepaid_amount', unit_amount: 5 }).and_return(price: { id: 'price_id' }).exactly(1).time
        expect(Stripe::Price).to receive(:update).with({ id: 'price_id_remaining_amount', unit_amount: 6 }).and_return(price: { id: 'price_id' }).exactly(1).time

        StripeIntegrator.sync(event)
      end
    end
  end
end
