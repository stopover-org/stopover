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

RSpec.describe Stopover::StripeIntegrator, type: :model do
  describe 'stripe integrator' do
    let!(:event) { create(:event, organizer_price_per_uom: Money.new(20), deposit_amount: Money.new(5)) }
    let!(:integrated_event) { create(:stripe_integration_factory, organizer_price_per_uom: Money.new(20), deposit_amount: Money.new(5)) }

    it 'is created and product_id and price_id eq Stripe ids' do
      expect(Stripe::Product).to receive(:create).with({
                                                         name: event.title,
                                                         description: event.description,
                                                         metadata: {
                                                           stopover_id: event.id,
                                                           stopover_model_name: event.class.name
                                                         }
                                                       }).and_return({ id: 'product_id' })
      expect(Stripe::Price).to receive(:create).with({ unit_amount_decimal: 22,
                                                       product: 'product_id',
                                                       currency: :usd,
                                                       billing_scheme: 'per_unit',
                                                       nickname: 'full_amount',
                                                       metadata: {
                                                         stopover_id: event.id,
                                                         stopover_model_name: event.class.name
                                                       } })
                                               .and_return({ id: 'price_id1' })
      expect(Stripe::Product).to receive(:retrieve).with(id: 'product_id').and_return({ id: 'product_id' }).exactly(0).times

      Stopover::StripeIntegrator.sync(event)

      event.stripe_integrations.each do |stripe_integration|
        expect(stripe_integration.product_id).to eq('product_id')
      end

      expect(event.stripe_integrations.count).to eq(1)
      expect(event.current_stripe_integration.price_id).to eq('price_id1')
    end
    it 'is updated and product_id and price_id eq Stripe ids' do
      expect(Stripe::Product).to receive(:update).with({ name: integrated_event.title,
                                                         id: 'product_id',
                                                         description: integrated_event.description,
                                                         metadata: {
                                                           stopover_id: integrated_event.id,
                                                             stopover_model_name: integrated_event.class.name
                                                         } })
                                                 .and_return({ id: 'product_id' })
      expect(Stripe::Price).to receive(:create).with({ unit_amount_decimal: 22,
                                                       product: 'product_id',
                                                       currency: :usd,
                                                       billing_scheme: 'per_unit',
                                                       nickname: 'full_amount',
                                                       metadata: {
                                                         stopover_id: integrated_event.id,
                                                           stopover_model_name: integrated_event.class.name
                                                       } })
                                               .and_return({ id: 'price_id_full_amount' })
      expect(Stripe::Product).to receive(:retrieve).with(id: 'product_id').and_return({ id: 'product_id' }).exactly(1).times
      expect(Stripe::Price).to receive(:retrieve).with(id: 'price_id_full_amount').and_return({ id: 'price_id_full_amount' }).exactly(1).times

      Stopover::StripeIntegrator.sync(integrated_event)

      integrated_event.stripe_integrations.each do |stripe_integration|
        expect(stripe_integration.product_id).to eq('product_id')
        expect(stripe_integration.price_id).to eq('price_id_full_amount')
      end

      expect(integrated_event.stripe_integrations.pluck(:version)).to eq([2, 1])

      expect(integrated_event.stripe_integrations.count).to eq(2)
    end

    context 'delete' do
      let!(:event) { create(:stripe_integration_factory) }
      it 'product and price. Active changing and ids returned' do
        event.stripe_integrations.each do |stripe_integration|
          expect(Stripe::Price).to receive(:update).with(stripe_integration.price_id, { active: false }).and_return(price: { id: stripe_integration.price_id }).exactly(1).time
        end
        expect(Stripe::Product).to receive(:update).with(event.current_stripe_integration.product_id, { active: false }).and_return(product: { id: 'product_id' }).exactly(1).time
        Stopover::StripeIntegrator.delete(event)
        event.reload.stripe_integrations.each do |stripe_integration|
          expect(stripe_integration.status).to eq('removed')
        end
      end
      let!(:event_no_stripe) { create(:event) }
      it 'model has no stripe integration, method rescued' do
        expect(event_no_stripe.stripe_integrations).to match_array([])
        expect(Stopover::StripeIntegrator.delete(event_no_stripe)).to eq({ product_ids: [],
                                                                           price_ids: {} })
      end
    end

    context 'retrieve' do
      let!(:event) { create(:stripe_integration_factory) }
      it 'price and product and stripe integrator returns two models' do
        event.stripe_integrations.each do |stripe_integration|
          expect(Stripe::Price).to receive(:retrieve).with(id: stripe_integration.price_id).and_return('price').exactly(1).time
        end
        expect(Stripe::Product).to receive(:retrieve).with(id: event.current_stripe_integration.product_id).and_return('product').exactly(1).time
        expect(Stopover::StripeIntegrator.retrieve(event)).to eq({ product: 'product',
                                                                   prices: { full_amount: 'price' } })
      end
    end

    context 'update' do
      let!(:event) { create(:stripe_integration_factory, organizer_price_per_uom: Money.new(10)) }
      it 'price and product' do
        event.update(title: 'new_title', organizer_price_per_uom: Money.new(10), deposit_amount: Money.new(5))
        expect(Stripe::Product).to receive(:retrieve).with(id: 'product_id').and_return({ id: 'product_id', name: 'product_name' }).exactly(1).time
        expect(Stripe::Price).to receive(:retrieve).with(id: 'price_id_full_amount').and_return({ unit_amount: 22 }).exactly(1).time

        expect(Stripe::Product).to receive(:update).with({ id: 'product_id',
                                                           name: 'new_title',
                                                           description: event.description,
                                                           metadata: {
                                                             stopover_id: event.id,
                                                             stopover_model_name: event.class.name
                                                           } }).and_return(product: { id: 'product_id' }).exactly(1).time
        expect(Stripe::Price).to receive(:create).with({ unit_amount_decimal: 11,
                                                         product: 'product_id',
                                                         currency: :usd,
                                                         billing_scheme: 'per_unit',
                                                         nickname: 'full_amount',
                                                         metadata: {
                                                           stopover_id: event.id,
                                                             stopover_model_name: event.class.name
                                                         } })
                                                 .and_return(price: { id: 'price_id' }).exactly(1).time
        Stopover::StripeIntegrator.sync(event)
      end
    end
  end
end
