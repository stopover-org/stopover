# frozen_string_literal: true

module Mutations
  module BookingsRelated
    module Authorizations
      module BookingAuthorized
        def authorized?(**inputs)
          record = authorization_field(inputs)
          record = record.try(:booking) unless record.is_a?(Booking)
          return false, { errors: [I18n.t('graphql.errors.booking_past')] } if record&.past?
          return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if record&.cancelled?
          super
        end
      end
    end
  end
end
