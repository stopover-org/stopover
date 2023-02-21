# frozen_string_literal: true

require 'stripe'
class StripeIntegrator
  def self.sync_data(model)
    if model.try(:stripe_integration)
      if model.stripe_integration.try(:product_id) && model.stripe_integration.try(:price_id)
        Stripe::Product.update(
          id: model.stripe_integration.product_id,
          name: model.stripe_integration.name
        )
        Stripe::Price.update(
          id: model.stripe_integration.price_id,
          unit_amount: model.stripe_integration.unit_amount.to_i
        )
      end
    else
      name = ''
      unit_amount = 0
      class_name = model.class.name

      if class_name == 'Event'
        name = model.title
        unit_amount = model.attendee_price_per_uom_cents.to_i
      end
      if class_name == 'EventOption'
        name = model.title
        unit_amount = model.attendee_price_cents.to_i
      end

      product = Stripe::Product.create(name: name)
      price = Stripe::Price.create(unit_amount_decimal: unit_amount,
                                   product: product.id,
                                   currency: 'usd',
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
