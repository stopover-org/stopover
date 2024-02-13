# frozen_string_literal: true

class WebhooksController < ApplicationController
  def create
    endpoint_secret = if Rails.env.development?
                        Rails.application.credentials.stripe_local_webhook_secret
                      else
                        Rails.application.credentials.stripe_webhook_secret
                      end

    payload = request.body.read
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']

    begin
      event = Stripe::Webhook.construct_event(
        payload, sig_header, endpoint_secret
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
      @service = Stopover::StripeCheckoutService.new(payment)
      @service.complete(payment)
    end

    LogEvent.create(event_type: event.type, content: event)
  end
end
