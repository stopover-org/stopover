# frozen_string_literal: true

module Stopover
  class FlagsSupport
    def self.skip_notifications(skip: true, &block)
      return unless skip

      flag = :skip_notifications_delivery
      disable_flag(flag, &block)
    end

    def self.skip_stripe_integrations(skip: true, &block)
      return unless skip

      flag = :skip_stripe_integration
      disable_flag(flag, &block)
    end

    def self.disable_phone_validation(skip: true, &block)
      return unless skip

      flag = :skip_phone_validation
      disable_flag(flag, &block)
    end

    class << self
      private

      def disable_flag(flag)
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
end
