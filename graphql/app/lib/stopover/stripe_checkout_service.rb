# frozen_string_literal: true

module Stopover
  class StripeCheckoutService
    attr_accessor :payment, :booking, :payment_type

    def initialize(payment = nil, booking = nil, payment_type = nil)
      @payment = payment
      @booking = booking
      @payment_type = payment_type
    end

    def complete(checkout = nil)
      checkout ||= Stripe::Checkout::Session.retrieve(@payment.stripe_checkout_session_id)
      @payment.update!(payment_intent_id: checkout[:payment_intent]) if checkout[:payment_intent]
      @payment.success!
      @payment.booking.pay! if @payment.booking.left_to_pay_price.zero?
      @payment.booking.trip.activate! unless @payment.booking.trip.active?

      @payment
    end

    def generate_stripe_checkout_session
      if payment_type == 'full_amount'
        return if @booking.left_to_pay_price.zero?
      elsif @booking.left_to_pay_deposit_price.zero?
        return
      end

      @payment = @booking.payments.create!(payment_type: @payment_type,
                                           balance: @booking.event.firm.balance,
                                           total_price: @payment_type == 'full_amount' ? @booking.left_to_pay_price : @booking.left_to_pay_deposit_price)

      case @payment_type
      when 'full_amount'
        @booking.update!(payment_type: 'stripe')
        generate_session_full_amount
      when 'deposit'
        @booking.update!(payment_type: 'cash')
        generate_session_deposit
      end
    end

    def generate_session_full_amount
      attendee_options = {}

      @booking.attendees.where.not(status: :removed).map do |att|
        att.attendee_options.each do |opt|
          stripe_integration = opt.stripe_integration

          if attendee_options[opt.event_option.id].nil?
            attendee_options[opt.event_option.id] = if opt.event_option.built_in
                                                      {
                                                        price_data: ::Stopover::StripeIntegrator.empty_price(stripe_integration),
                                                        quantity: 0
                                                      }
                                                    else
                                                      {
                                                        price: stripe_integration.price_id,
                                                        quantity: 0
                                                      }
                                                    end
          end

          @payment.stripe_integrations << stripe_integration

          attendee_options[opt.event_option.id][:quantity] += 1
        end
      end

      booking_options = @booking.booking_options.map do |opt|
        stripe_integration = opt.stripe_integration

        payment.stripe_integrations << stripe_integration

        if opt.event_option.built_in
          {
            price_data: ::Stopover::StripeIntegrator.empty_price(stripe_integration),
            quantity: 1
          }
        else
          {
            price: stripe_integration.price_id,
            quantity: 1
          }
        end
      end

      line_items = if @booking.left_to_pay_price == @booking.attendee_total_price
                     [
                       {
                         price: @booking.stripe_integration.price_id,
                         quantity: @booking.attendees.where.not(status: :removed).count
                       },
                       *booking_options,
                       *attendee_options.values
                     ]
                   else
                     [
                       {
                         price_data: { currency: 'rsd',
                                       product_data: { name: @booking.event.title },
                                       unit_amount: @booking.left_to_pay_price.cents },
                         quantity: 1
                       }
                     ]
                   end
      checkout = Stripe::Checkout::Session.create({
                                                    line_items: line_items,
                                                    mode: 'payment',
                                                    success_url: "#{Rails.application.credentials.frontend_url}/checkouts/verify/#{GraphqlSchema.id_from_object(@booking)}",
                                                    cancel_url: "#{Rails.application.credentials.frontend_url}/checkouts/verify/#{GraphqlSchema.id_from_object(@booking)}",
                                                    expires_at: (Time.zone.now + (30 * 60)).to_i
                                                  })
      @payment.stripe_checkout_session_id = checkout[:id]
      @payment.save!
      @payment.process!

      {
        url: checkout[:url],
        payment: @payment
      }
    end

    def generate_session_deposit
      line_items = [
        {
          price_data: { currency: 'rsd',
                        product_data: { name: @booking.event.title },
                        unit_amount: @booking.left_to_pay_deposit_price.cents },
          quantity: 1
        }
      ]
      checkout = Stripe::Checkout::Session.create({
                                                    line_items: line_items,
                                                    mode: 'payment',
                                                    success_url: "#{Rails.application.credentials.frontend_url}/checkouts/verify/#{GraphqlSchema.id_from_object(@booking)}",
                                                    cancel_url: "#{Rails.application.credentials.frontend_url}/checkouts/verify/#{GraphqlSchema.id_from_object(@booking)}",
                                                    expires_at: (Time.zone.now + (30 * 60)).to_i
                                                  })

      @payment.stripe_checkout_session_id = checkout[:id]
      @payment.save!
      @payment.process!

      {
        url: checkout[:url],
        payment: @payment
      }
    end

    def expire_checkout_session
      Stripe::Checkout::Session.expire(@payment.stripe_checkout_session_id)
      @payment.cancel!
    end
  end
end
