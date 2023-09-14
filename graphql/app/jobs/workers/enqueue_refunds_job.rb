# frozen_string_literal: true

module Workers
  class EnqueueRefundsJob < ApplicationJob
    queue_as :default

    def perform
      Refund.pending.where(refund_id: nil).each do |refund|
        ::Stopover::RefundManagement::RefundCreator.new(refund.booking, refund.booking.user, refund).perform
      end
    end
  end
end
