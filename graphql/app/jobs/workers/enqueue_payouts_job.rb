# frozen_string_literal: true

module Workers
  class EnqueuePayoutsJob < ApplicationJob
    queue_as :default

    def perform
      Payout.pending.each do |payout|
        ::PayoutManagement::PayoutProcessing.perform_later(payout.id)
      end
    end
  end
end
