# frozen_string_literal: true

module Mutations
  module BookingsRelated
    module Authorizations
      module BookingOptionAuthorized
        def authorized?(**inputs)
          record = authorization_field(inputs)

          return false, { errors: [I18n.t('graphql.errors.event_past')] } if record.booking.past?
          return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if record.booking.cancelled?

          super
        end
      end
    end
  end
end
