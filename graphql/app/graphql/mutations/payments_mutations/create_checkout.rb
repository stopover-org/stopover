# frozen_string_literal: true

module Mutations
  module PaymentsMutations
    class CreateCheckout < BaseMutation
      authorized_only
      authorize lambda { |booking:|
        payments = booking.payments.where(payment_type: args[:payment_type]).processing
        'Multiple payments in process' if payments.count > 1
      }

      field :booking, Types::BookingRelated::BookingType
      field :url, String
      field :payment, Types::PaymentRelated::PaymentType

      argument :payment_type, Types::PaymentRelated::PaymentTypesEnum
      argument :booking_id, ID, loads: Types::BookingRelated::BookingType

      def resolve(booking:, **args)
        payments = booking.payments.where(payment_type: args[:payment_type]).processing

        if payments.any?
          payment = payments.last

          checkout = Stripe::Checkout::Session.retrieve(payment.stripe_checkout_session_id)

          if checkout[:status] == 'complete'
            ::Stopover::StripeCheckoutService.complete(payment)
            return {
              url: nil,
              booking: booking.reload,
              payment: payment.reload
            }
          end

          if checkout[:status] == 'expired'
            payment.cancel!
            checkout = Stopover::StripeCheckoutService.generate_stripe_checkout_session(booking, args[:payment_type])
            return {
              url: checkout[:url],
              booking: booking,
              payment: checkout[:payment]
            }
          else
            return {
              url: checkout[:url],
              booking: booking,
              payment: payment
            }
          end
        end

        checkout = Stopover::StripeCheckoutService.generate_stripe_checkout_session(booking, args[:payment_type])

        {
          url: checkout[:url],
          booking: booking,
          payment: checkout[:payment]
        }
      end
    end
  end
end
