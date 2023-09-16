# frozen_string_literal: true

module PayoutManagement
  class PayoutProcessing < ApplicationJob
    def perform(payout_id)
      payout = Payout.find(payout_id)
      payout.process!
    end
  end
end
