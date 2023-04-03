# frozen_string_literal: true

class StripeIntegratorRetrieveJob < ApplicationJob
  queue_as :default

  def perform(model)
    StripeIntegrator.retrieve(model)
  end
end
