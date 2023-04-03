# frozen_string_literal: true

class StripeIntegratorSyncJob < ApplicationJob
  queue_as :default

  def perform(model)
    StripeIntegrator.sync(model)
  end
end
