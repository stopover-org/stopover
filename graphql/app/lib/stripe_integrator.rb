# frozen_string_literal: true

require 'stripe'
class StripeIntegrator
  def self.retrieve(model)
    product = nil
    price = nil
    if model.try(:stripe_integration)
      product = Stripe::Product.retrieve(id: product_id) if model.stripe_integration.try(:product_id)
      price = Stripe::Price.retrieve(id: price_id) if model.stripe_integration.try(:price_id)
    end
    {
      product: product,
      price: price
    }
  rescue StandardError => e
    {
      product: product || nil,
      price: price || nil
    }
  end

  def self.delete(model)
    if model.stripe_integration.try(:price_id)
      Stripe::Price.update(
        price_id,
        {
          active: false
        }
      )
    end
    Stripe::Product.delete(product_id) if model.stripe_integration.try(:product_id)
  end

  def self.sync(model)
    if model.try(:stripe_integration)
      if model.stripe_integration.try(:product_id) && model.stripe_integration.try(:price_id)
        stripe = retrieve(model)
        if stripe[:product][:name] != model.stripe_integration.name
          Stripe::Product.update(
            id: model.stripe_integration.product_id,
            name: model.stripe_integration.name
          )
        end
        if stripe[:price][:unit_amount] != model.stripe_integration.name
          Stripe::Price.update(
            id: model.stripe_integration.price_id,
            unit_amount: model.stripe_integration.unit_amount.to_i
          )
        end
      end

      return
    end

    stripe_integration = StripeIntegration.new(
      stripeable_type:  model.class.name,
      stripeable_id:    model.id
    )

    product = Stripe::Product.create(name: stripe_integration.name)
    price =   Stripe::Price.create(unit_amount_decimal: stripe_integration.unit_amount.cents,
                                   product: product.id,
                                   currency: model.unit_amount.currency,
                                   billing_scheme: 'per_unit')

    stripe_integration.price_id =   price[:id]
    stripe_integration.product_id = product[:id]
    stripe_integration.save!
  end
end
