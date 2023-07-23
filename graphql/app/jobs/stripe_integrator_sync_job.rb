# frozen_string_literal: true

class StripeIntegratorSyncJob < ApplicationJob
  queue_as :default

  def perform(model_name, model_id)
    model = model_name.classify.constantize.send(:find, model_id)
    Stopover::StripeIntegrator.sync(model)
  end
end
