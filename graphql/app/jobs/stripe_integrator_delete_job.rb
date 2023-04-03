# frozen_string_literal: true

class StripeIntegratorDeleteJob < ApplicationJob
  queue_as :default

  def perform(model)
    StripeIntegrator.delete(model)
  end
end
