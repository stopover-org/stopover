# frozen_string_literal: true

module Mutations
  module BookingsRelated
    module Authorizations
      module PotentialBookingAuthorized
        def authorized?(**inputs)
          event = authorization_field(inputs)
          booked_for = inputs[:booked_for]
          schedules = event.schedules.active.where(scheduled_for: booked_for)
          potential_attendees_count = inputs[:attendees_count] + Attendee.where(booking_id: schedules.first&.booking_ids).count
          already_booked = current_account ? current_account.bookings.where.not(status: :cancelled).where(schedule_id: schedules.ids).any? : false

          return false, { errors: [I18n.t('graphql.errors.event_past')] } if booked_for.past?
          return false, { errors: [I18n.t('graphql.errors.general')] } if schedules.empty?
          return false, { errors: [I18n.t('graphql.errors.already_booked')] } if already_booked
          return false, { errors: [I18n.t('graphql.errors.all_places_reserved')] } if inputs[:event].max_attendees&.positive? && potential_attendees_count > inputs[:event].max_attendees

          super
        end
      end
    end
  end
end
