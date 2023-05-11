# frozen_string_literal: true

require 'stripe'
module Stopover
  class StripeIntegrator
    def self.retrieve(model)
      return if ::Configuration.get_value('ENABLE_STRIPE_INTEGRATION').value != 'true'

      product = nil
      prices = {}
      if model.try(:stripe_integrations)
        model.stripe_integrations.each do |stripe_integration|
          product = Stripe::Product.retrieve(id: stripe_integration.product_id) if !product && stripe_integration.try(:product_id)
          prices.store(stripe_integration.price_type.to_sym, Stripe::Price.retrieve(id: stripe_integration.price_id)) if stripe_integration.try(:price_id)
        end
      end
      {
        product: product,
        prices: prices
      }
    rescue StandardError => e
      {
        product: product,
        prices: prices
      }
    end

    def self.delete(model)
      return if ::Configuration.get_value('ENABLE_STRIPE_INTEGRATION').value != 'true'

      product_id = model.stripe_integrations.first.product_id
      Stripe::Product.update(
        product_id,
        {
          active: false
        }
      )

      price_ids = {}
      model.stripe_integrations.each do |stripe_integration|
        Stripe::Price.update(
          stripe_integration.price_id,
          {
            active: false
          }
        )
        price_ids.store(stripe_integration.price_type.to_sym, stripe_integration.price_id)
        stripe_integration.delete!
      end

      {
        product_id: product_id,
        price_ids: price_ids
      }
    rescue StandardError => e
      {
        product_id: nil,
        price_ids: nil
      }
    end

    def self.sync(model)
      return if ::Configuration.get_value('ENABLE_STRIPE_INTEGRATION').value != 'true'

      model.stripe_integrations.each do |stripe_integration|
        stripe_integration.payments.processing.each do |payment|
          Stripe::Checkout::Session.expire(payment.stripe_checkout_session_id)
          payment.cancel!
        end
      end

      if model.stripe_integrations.empty?
        create_full_amount(model)
        create_prepaid_amount(model) if model.is_a? Event
        create_remaining_amount(model) if model.is_a? Event
        return model.stripe_integrations
      end
      update_full_amount(model)
      update_prepaid_amount(model) if model.is_a? Event
      update_remaining_amount(model) if model.is_a? Event
      model.stripe_integrations
    rescue StandardError => e
      model.stripe_integrations
    end

    def self.create_full_amount(model)
      stripe_integration = StripeIntegration.new(price_type: :full_amount)
      return unless model.stripe_integrations.where(price_type: :full_amount).empty?

      model.stripe_integrations << stripe_integration

      product = Stripe::Product.create(
        name: stripe_integration.name,
        description: model.description,
        metadata: {
          stopover_id: model.id,
          stopover_model_name: model.class.name
        }
      )
      price = Stripe::Price.create(unit_amount_decimal: stripe_integration.unit_amount.cents,
                                   product: product[:id],
                                   currency: stripe_integration.unit_amount.currency.id,
                                   billing_scheme: 'per_unit',
                                   nickname: stripe_integration.price_type,
                                   metadata: {
                                     stopover_id: model.id,
                                     stopover_model_name: model.class.name
                                   })
      stripe_integration.price_id = price[:id]
      stripe_integration.product_id = product[:id]
      stripe_integration.save!
    end

    def self.create_prepaid_amount(model)
      stripe_integration = StripeIntegration.new(price_type: :prepaid_amount)
      return unless model.stripe_integrations.where(price_type: :prepaid_amount).empty?

      model.stripe_integrations << stripe_integration
      stripe = retrieve(model)

      product = stripe[:product]
      price = Stripe::Price.create(unit_amount_decimal: stripe_integration.prepaid_amount.cents,
                                   product: product[:id],
                                   currency: stripe_integration.unit_amount.currency.id,
                                   billing_scheme: 'per_unit',
                                   nickname: stripe_integration.price_type,
                                   metadata: {
                                     stopover_id: model.id,
                                     stopover_model_name: model.class.name
                                   })
      stripe_integration.price_id =   price[:id]
      stripe_integration.product_id = product[:id]

      stripe_integration.save!
    end

    def self.create_remaining_amount(model)
      stripe_integration = StripeIntegration.new(price_type: :remaining_amount)
      return unless model.stripe_integrations.where(price_type: :remaining_amount).empty?

      model.stripe_integrations << stripe_integration
      stripe = retrieve(model)
      product = stripe[:product]
      price = Stripe::Price.create(unit_amount_decimal: stripe_integration.remaining_amount.cents,
                                   product: product[:id],
                                   currency: stripe_integration.unit_amount.currency.id,
                                   billing_scheme: 'per_unit',
                                   nickname: stripe_integration.price_type,
                                   metadata: {
                                     stopover_id: model.id,
                                     stopover_model_name: model.class.name
                                   })
      stripe_integration.price_id =   price[:id]
      stripe_integration.product_id = product[:id]
      stripe_integration.save!
    end

    def self.update_full_amount(model)
      stripe_integration = model.stripe_integrations.where(price_type: :full_amount).first
      stripe = retrieve(model)

      if stripe[:product][:name] != stripe_integration.name
        Stripe::Product.update(
          id: stripe_integration.product_id,
          name: stripe_integration.name,
          description: model.description,
          metadata: {
            stopover_id: model.id,
            stopover_model_name: model.class.name
          }
        )
      end
      if stripe[:prices][:full_amount][:unit_amount] != stripe_integration.unit_amount.cents
        Stripe::Price.update(
          id: stripe_integration.price_id,
          unit_amount: stripe_integration.unit_amount.cents,
          nickname: stripe_integration.price_type,
          metadata: {
            stopover_id: model.id,
            stopover_model_name: model.class.name
          }
        )
      end
    end

    def self.update_prepaid_amount(model)
      stripe_integration = model.stripe_integrations.where(price_type: :prepaid_amount).first
      stripe = retrieve(model)
      if stripe[:product][:name] != stripe_integration.name
        Stripe::Product.update(
          id: stripe_integration.product_id,
          name: stripe_integration.name,
          description: model.description,
          metadata: {
            stopover_id: model.id,
            stopover_model_name: model.class.name
          }
        )
      end

      if stripe[:prices][:prepaid_amount][:unit_amount] != stripe_integration.prepaid_amount.cents
        Stripe::Price.update(
          id: stripe_integration.price_id,
          unit_amount: stripe_integration.prepaid_amount.cents,
          nickname: stripe_integration.price_type,
          metadata: {
            stopover_id: model.id,
            stopover_model_name: model.class.name
          }
        )
      end
    end

    def self.update_remaining_amount(model)
      stripe_integration = model.stripe_integrations.where(price_type: :remaining_amount).first
      stripe = retrieve(model)
      if stripe[:product][:name] != stripe_integration.name
        Stripe::Product.update(
          id: stripe_integration.product_id,
          name: stripe_integration.name,
          description: model.description,
          metadata: {
            stopover_id: model.id,
            stopover_model_name: model.class.name
          }
        )
      end
      if stripe[:prices][:remaining_amount][:unit_amount] != stripe_integration.remaining_amount.cents
        Stripe::Price.update(
          id: stripe_integration.price_id,
          unit_amount: stripe_integration.remaining_amount.cents,
          nickname: stripe_integration.price_type,
          metadata: {
            stopover_id: model.id,
            stopover_model_name: model.class.name
          }
        )
      end
    end
  end
end
