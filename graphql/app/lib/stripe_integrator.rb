# frozen_string_literal: true

require 'stripe'
class StripeIntegrator
  def self.retrieve(model)
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
    if model.stripe_integration.try(:price_id)
      Stripe::Price.update(
        model.stripe_integration.price_id,
        {
          active: false
        }
      )
    end
    if model.stripe_integration.try(:product_id)
      Stripe::Product.update(
        model.stripe_integration.product_id,
        {
          active: false
        }
      )
    end
    model.stripe_integration.delete!
    {
      product: model.stripe_integration.product_id,
      price: model.stripe_integration.price_id
    }
  rescue StandardError => e
    {
      product: nil,
      price: nil
    }
  end

  def self.sync(model)
    if model.stripe_integrations.empty?

      stripe = retrieve(model)
      if stripe[:product][:name] != model.stripe_integration.name
        Stripe::Product.update(
          id: model.stripe_integration.product_id,
          name: model.stripe_integration.name
        )
      end
      if stripe[:price][:unit_amount] != model.stripe_integration.unit_amount
        Stripe::Price.update(
          id: model.stripe_integration.price_id,
          unit_amount: model.stripe_integration.unit_amount.to_i
        )
      end

      return
    end

    model.stripe_integration = StripeIntegration.new
    product = Stripe::Product.create(name: model.stripe_integration.name)
    price = Stripe::Price.create(unit_amount_decimal: model.stripe_integration.unit_amount.cents,
                                 product: product[:id],
                                 currency: model.stripe_integration.unit_amount.currency.id,
                                 billing_scheme: 'per_unit')

    model.stripe_integration.price_id =   price[:id]
    model.stripe_integration.product_id = product[:id]
    model.stripe_integration.save!
  rescue StandardError => e
    {
      product: nil,
      price: nil
    }
  end

  def self.create_full_amount(model)
    model.stripe_integrations << StripeIntegration.new(price_type: :full_amount)
    stripe_integration = model.stripe_integrations.last
    product = Stripe::Product.create(name: stripe_integration.name)
    price = Stripe::Price.create(unit_amount_decimal: stripe_integration.unit_amount.cents,
                                 product: product[:id],
                                 currency: stripe_integration.unit_amount.currency.id,
                                 billing_scheme: 'per_unit')
    stripe_integration.price_id = price[:id]
    stripe_integration.product_id = product[:id]
    stripe_integration.save!
  end

  def self.create_prepaid_amount(model)
    model.stripe_integrations << StripeIntegration.new(price_type: :prepaid_amount)
    stripe_integration = model.stripe_integrations.last
    stripe = retrieve(model)
    product = stripe[:product]
    price = Stripe::Price.create(unit_amount_decimal: stripe_integration.prepaid_amount.cents,
                                 product: product[:id],
                                 currency: stripe_integration.unit_amount.currency.id,
                                 billing_scheme: 'per_unit')
    stripe_integration.price_id =   price[:id]
    stripe_integration.product_id = product[:id]
    stripe_integration.save!
  end

  def self.create_remaining_amount(model)
    model.stripe_integrations << StripeIntegration.new(price_type: :remaining_amount)
    stripe_integration = model.stripe_integrations.last
    stripe = retrieve(model)
    product = stripe[:product]
    price = Stripe::Price.create(unit_amount_decimal: stripe_integration.unit_amount.cents - stripe_integration.prepaid_amount.cents,
                                 product: product[:id],
                                 currency: stripe_integration.unit_amount.currency.id,
                                 billing_scheme: 'per_unit')
    stripe_integration.price_id =   price[:id]
    stripe_integration.product_id = product[:id]
    stripe_integration.save!
  end

  def self.update_prepaid_amount(model)
    stripe_integration = model.stripe_integrations.where(price_type: :prepaid_amount)
    stripe = retrieve(model)
    if stripe[:product][:name] != model.stripe_integrations.first.name
      Stripe::Product.update(
        id: model.stripe_integrations.first.product_id,
        name: model.stripe_integrations.first.name
      )
    end
    if stripe[:prices][:prepaid_amount][:unit_amount] != stripe_integration.unit_amount
      Stripe::Price.update(
        id: stripe_integration.price_id,
        unit_amount: stripe_integration.unit_amount.to_i
      )
    end
  end
end
