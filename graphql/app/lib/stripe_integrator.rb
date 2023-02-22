# frozen_string_literal: true

require 'stripe'
class StripeIntegrator
  def self.retrieve(product_id, price_id)
    product = nil
    price = nil
    product_id && product = Stripe::Product.retrieve(id: product_id)
    price_id && price = Stripe::Price.retrieve(id: price_id)
    {
      product: product,
      price: price
    }
  end

  def self.delete(product_id, price_id)
    price_id && Stripe::Price.update(
      price_id,
      {
        active: false
      }
    )
    product_id && Stripe::Product.delete(product_id)
  end

  def self.sync(model)
    if model.try(:stripe_integration)

      if model.stripe_integration.try(:product_id) && model.stripe_integration.try(:price_id)
        stripe = retrieve(
          model.stripe_integration.product_id,
          model.stripe_integration.price_id
        )

        stripe[:product][:name] == model.stripe_integration.name && Stripe::Product.update(
          id: model.stripe_integration.product_id,
          name: model.stripe_integration.name
        )
        stripe[:price][:unit_amount] == model.stripe_integration.name && Stripe::Price.update(
          id: model.stripe_integration.price_id,
          unit_amount: model.stripe_integration.unit_amount.to_i
        )
      end
    else
      class_name = model.class.name

      case class_name
      when 'Event'
        name = model.title
        unit_amount = model.attendee_price_per_uom_cents
      when 'EventOption'
        name = model.title
        unit_amount = model.attendee_price_cents
      else
        name = ''
        unit_amount = 0
      end

      product = Stripe::Product.create(name: name)
      price = Stripe::Price.create(unit_amount_decimal: unit_amount,
                                   product: product.id,
                                   currency: model.attendee_price_cents.currency,
                                   billing_scheme: 'per_unit')

      StripeIntegration.create(
        stripeable_type: model.class.name,
        stripeable_id: model.id,
        price_id: price[:id],
        product_id: product[:id],
        unit_amount: unit_amount,
        name: name
      )
    end
  end
end
