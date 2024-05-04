# frozen_string_literal: true

class StripeIntegratorSyncJob < ApplicationJob
  queue_as :default

  def perform(model_name, model_id)
    return if Flipper.enabled?(:skip_stripe_integration) || Rails.env.test?
    model = model_name.classify.constantize.send(:find, model_id)
    Stopover::StripeIntegrator.sync(model)
  end
end
