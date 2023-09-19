# frozen_string_literal: true

module Workers
  class EnsureRefundsStatusJob < ApplicationJob
    queue_as :default

    def perform
      Refund.where(refund_id: nil).each do |refund|
        refund.process! if refund.related_refunds.where(status: 'processing').any? && refund.pending?
        refund.success! if refund.related_refunds.where(status: 'successful').count == refund.related_refunds.count && refund.processing?

        GraphqlSchema.subscriptions.trigger(:booking_changed, { bookingId: refund.booking.id }, { booking: refund.booking })
      end
    end
  end
end
