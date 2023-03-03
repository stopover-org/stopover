# frozen_string_literal: true

require 'stripe'
class StripeIntegrator
  def self.retrieve(model)
    product = nil
    price = nil
    if model.try(:stripe_integration)
      product = Stripe::Product.retrieve(id: model.stripe_integration.product_id) if model.stripe_integration.try(:product_id)
      price = Stripe::Price.retrieve(id: model.stripe_integration.price_id) if model.stripe_integration.try(:price_id)
    end
    {
      product: product,
      price: price
    }
  rescue StandardError => e
    {
      product: product,
      price: price
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
    if model.try(:stripe_integration) && (model.stripe_integration.price_id && model.stripe_integration.product_id)
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
    price = Stripe::Price.create(unit_amount_decimal: model.stripe_integration.unit_amount.cents, product: product[:id], currency: model.stripe_integration.unit_amount.currency.id, billing_scheme: 'per_unit')

    model.stripe_integration.price_id =   price[:id]
    model.stripe_integration.product_id = product[:id]
    model.stripe_integration.save!
  rescue StandardError => e
    {
      product: nil,
      price: nil
    }
  end
end
