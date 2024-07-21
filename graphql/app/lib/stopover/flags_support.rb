# frozen_string_literal: true

module Stopover
  class FlagsSupport
    # @param skip [Boolean] A flag indicating whether to skip notifications delivery
    # @param block [Block] A block of code to be executed
    #
    # Skips notifications delivery if the `skip` flag is set to `true`.
    # Calls the `disable_flag` method passing the `flag` parameter and the provided block.
    #
    # @return [void]
    def self.skip_notifications(skip: true, &block)
      return unless skip

      flag = :skip_notifications_delivery
      disable_flag(flag, &block)
    end

    # @!method skip_stripe_integrations(skip: true, &block)
    #
    # Skips the Stripe integrations if the given flag is true.
    #
    # @param skip [Boolean] (true) Whether to skip the Stripe integrations.
    # @param block [Proc] The block of code to execute when the flag is true.
    #
    # @return [void]
    def self.skip_stripe_integrations(skip: true, &block)
      return unless skip

      flag = :skip_stripe_integration
      disable_flag(flag, &block)
    end

    # @!method disable_phone_validation(skip: true, &block)
    #
    # Disables phone validation for a specific block of code.
    #
    # @param skip [Boolean] Whether to skip phone validation or not. Default is `true`.
    # @yield [] The block of code where phone validation will be disabled.
    #
    # @return [void]
    def self.disable_phone_validation(skip: true, &block)
      return unless skip

      flag = :skip_phone_validation
      disable_flag(flag, &block)
    end

    class << self
      private

      # @param flag [String] The name of the flag to disable.
      # @yield Executes the provided block of code.
      # @raise [StandardError] If an error occurs during the execution of the block.
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
