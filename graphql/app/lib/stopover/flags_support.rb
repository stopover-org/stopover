# frozen_string_literal: true

module Stopover
  class FlagsSupport
    def self.skip_notifications(skip: true)
      return unless skip

      flag = :skip_notifications_delivery
      initial_disabled = !Flipper.enabled?(flag)
      Flipper.enable(flag)
      yield
      Flipper.disable(flag) if initial_disabled
    rescue StandardError => e
      Flipper.disable(flag) if initial_disabled
      raise e
    end

    def self.skip_stripe_integrations(skip: true)
      return unless skip

      flag = :skip_stripe_integration
      initial_disabled = !Flipper.enabled?(flag)
      Flipper.enable(flag)
      yield
      Flipper.disable(flag) if initial_disabled
    rescue StandardError => e
      Flipper.disable(flag) if initial_disabled
      raise e
    end

    def self.disable_phone_validation(skip: true)
      return unless skip

      flag = :skip_phone_validation
      initial_disabled = !Flipper.enabled?(flag)
      Flipper.enable(flag)
      yield
      Flipper.disable(flag) if initial_disabled
    rescue StandardError => e
      Flipper.disable(flag) if initial_disabled
      raise e
    end
  end
end
