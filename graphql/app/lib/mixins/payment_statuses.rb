# frozen_string_literal: true

module Mixins
  module PaymentStatuses
    class << self
      include AASM

      aasm column: :status do
        state :pending, initial: true
        state :processing
        state :canceled
        state :successful

        event :process do
          transitions from: %i[successful pending canceled], to: :processing
        end
        event :cancel do
          transitions from: :processing, to: :canceled
        end
        event :success do
          after_commit do
            top_up_balance if respond_to?(:top_up_balance)
          end
          transitions from: :processing, to: :successful
        end
      end
    end
  end
end
