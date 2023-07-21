# frozen_string_literal: true

class WebhooksController < ApplicationController
  @endpoint_secret = Rails.application.credentials.stripe_webhook_secret
  def create
    payload = request.body.read
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    event = nil

    begin
      event = Stripe::Webhook.construct_event(
        payload, sig_header, @endpoint_secret
      )
    rescue Stripe::SignatureVerificationError, JSON::ParserError => e
      Sentry.capture_exception(e) if Rails.env.production?
      # Invalid payload
      # Invalid signature
      status 400
      return
    end

    case event.type
    when 'checkout.session.completed'
      payment = Payment.find_by(stripe_checkout_session_id: event.data.object.id)
      Stopover::StripeCheckoutService.complete(payment)
    end

    LogEvent.create(event_type: event.type, content: event)
  end
end
