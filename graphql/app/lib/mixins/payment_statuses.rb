# frozen_string_literal: true

module Mixins
  module PaymentStatuses
    extend ActiveSupport::Concern

    included do
      include AASM

      aasm column: :status do
        state :pending, initial: true
        state :processing
        state :cancelled
        state :successful

        event :process do
          transitions from: %i[successful pending cancelled], to: :processing
        end
        event :cancel do
          transitions from: :processing, to: :cancelled
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
