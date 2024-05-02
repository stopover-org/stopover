# frozen_string_literal: true

module Stopover
  class FlagsSupport
    # @param [TrueClass] skip
    def self.skip_notifications(skip: true)
      flag = :skip_notifications_delivery
      initial_disabled = !Flipper.enabled?(flag)
      Flipper.enable(flag) if skip
      yield
      Flipper.disable(flag) if initial_disabled && skip
    rescue StandardError => e
      Flipper.disable(flag) if initial_disabled && skip
      raise e
    end

    def self.skip_stripe_integrations(skip: true)
      flag = :skip_stripe_integration
      initial_disabled = !Flipper.enabled?(flag)
      Flipper.enable(flag) if skip
      yield
      Flipper.disable(flag) if initial_disabled && skip
    rescue StandardError => e
      Flipper.disable(flag) if initial_disabled && skip
      raise e
    end
  end
end
