# frozen_string_literal: true

class ConnectWebhooksController < ApplicationController
  def create
    endpoint_secret = if Rails.env.development?
                        Rails.application.credentials.stripe_local_webhook_secret
                      else
                        Rails.application.credentials.stripe_connect_webhook_secret
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
    when 'account.application.deauthorized'
      stripe_connect_id = event.data.object.account

      Stopover::StripeAccountService.deactivate(stripe_connect_id)
    end

    LogEvent.create!(event_type: event.type, content: event)
  end
end
