# frozen_string_literal: true

module Types
  class BookingCancellationOptionStatusEnum < Types::BaseEnum
    value 'active', 'available cancellation option'
    value 'inactive', 'disabled cancellation option'
    value 'removed', 'removed cancellation option'
  end
end
