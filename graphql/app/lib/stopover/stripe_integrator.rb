# frozen_string_literal: true

require 'stripe'
module Stopover
  class StripeIntegrator
    def self.empty_price(stripe_integration)
      { currency: 'usd', product: stripe_integration.product_id, unit_amount: 0 }
    end

    def self.retrieve(model)
      product = nil
      prices = {}
      if model.try(:stripe_integrations)
        stripe_integration = model.stripe_integrations.active.full_amount.first
        product = Stripe::Product.retrieve(id: stripe_integration.product_id) if !product && stripe_integration.try(:product_id)
        prices.store(stripe_integration.price_type.to_sym, Stripe::Price.retrieve(id: stripe_integration.price_id)) if stripe_integration.try(:price_id)
      end
      {
        product: product,
        prices: prices
      }
    rescue StandardError => e
      Sentry.capture_exception(e) if Rails.env.production?
      {
        product: product,
        prices: prices
      }
    end

    def self.delete(model)
      price_ids = {}
      product_ids = []

      model.stripe_integrations.active.each do |stripe_integration|
        product_id = stripe_integration.product_id
        Stripe::Product.update(
          product_id,
          {
            active: false
          }
        )

        Stripe::Price.update(
          stripe_integration.price_id,
          {
            active: false
          }
        )

        price_ids.store(stripe_integration.price_type.to_sym, stripe_integration.price_id)
        product_ids << product_id

        stripe_integration.soft_delete!
      end

      {
        product_ids: product_ids.uniq.compact,
        price_ids: price_ids
      }
    rescue StandardError => e
      Sentry.capture_exception(e) if Rails.env.production?
      {
        product_id: nil,
        price_ids: nil
      }
    end

    def self.sync(model)
      # expire sessions for removed stripe integrations too
      model.stripe_integrations.each do |stripe_integration|
        stripe_integration.payments.processing.each do |payment|
          Stripe::Checkout::Session.expire(payment.stripe_checkout_session_id)
          payment.cancel!
        end
      end

      if model.stripe_integrations.active.full_amount.empty?
        create_full_amount(model)
        return model.stripe_integrations
      else
        update_full_amount(model)
      end

      model.stripe_integrations
    rescue StandardError => e
      Sentry.capture_exception(e) if Rails.env.production?
      model.stripe_integrations
    end

    def self.create_full_amount(model)
      return if model.stripe_integrations.active.full_amount.any?

      stripe_integration = model.stripe_integrations.build
      stripe_integration.assign_attributes(price_type: :full_amount, stripeable_type: model.class.name, stripeable_id: model.id)

      product = Stripe::Product.create(
        name: stripe_integration.name,
        description: model.description,
        metadata: {
          stopover_id: stripe_integration.stripeable_id,
          stopover_model_name: stripe_integration.stripeable_type
        }
      )

      price = Stripe::Price.create(unit_amount_decimal: stripe_integration.unit_amount.cents,
                                   product: product[:id],
                                   currency: stripe_integration.unit_amount.currency.id,
                                   billing_scheme: 'per_unit',
                                   nickname: stripe_integration.price_type,
                                   metadata: {
                                     stopover_id: stripe_integration.stripeable_id,
                                     stopover_model_name: stripe_integration.stripeable_type
                                   })

      stripe_integration.price_id = price[:id]
      stripe_integration.product_id = product[:id]
      stripe_integration.save!
    end

    def self.update_full_amount(model)
      stripe_integration = model.stripe_integrations.active.full_amount.first
      stripe = retrieve(model)

      if stripe[:product][:name] != stripe_integration.name
        Stripe::Product.update(
          id: stripe_integration.product_id,
          name: stripe_integration.name,
          description: model.description,
          metadata: {
            stopover_id: stripe_integration.stripeable_id,
            stopover_model_name: stripe_integration.stripeable_type
          }
        )
      end

      if stripe[:prices][:full_amount][:unit_amount] != stripe_integration.unit_amount.cents
        dup_stripe_integration = stripe_integration.dup
        dup_stripe_integration.version += 1
        price = Stripe::Price.create(unit_amount_decimal: stripe_integration.unit_amount.cents,
                                     product: dup_stripe_integration.product_id,
                                     currency: stripe_integration.unit_amount.currency.id,
                                     billing_scheme: 'per_unit',
                                     nickname: stripe_integration.price_type,
                                     metadata: {
                                       stopover_id: stripe_integration.stripeable_id,
                                         stopover_model_name: stripe_integration.stripeable_type
                                     })
        dup_stripe_integration.price_id = price[:id]

        dup_stripe_integration.save!
      end
    end
  end
end
