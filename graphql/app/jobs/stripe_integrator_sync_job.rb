# frozen_string_literal: true

class StripeIntegratorSyncJob < ApplicationJob
  queue_as :default

  def perform(model)
<<<<<<< HEAD
    Stopover::StripeIntegrator.sync(model)
=======
    return if Rails.env.test?

    StripeIntegrator.sync(model)
>>>>>>> 13f2ec2 (wip: small improvement)
  end
end
