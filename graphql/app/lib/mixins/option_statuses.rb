# frozen_string_literal: true

module Mixins
  module OptionStatuses
    class << self
      include AASM

      aasm column: :status do
        state :available, initial: true
        state :not_available

        event :disable do
          transitions from: :available, to: :not_available
        end

        event :restore do
          transitions from: :not_available, to: :available
        end
      end
    end
  end
end
