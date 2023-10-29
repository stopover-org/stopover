# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class UpdateAttendee < BaseMutation
      field :attendee, Types::BookingsRelated::AttendeeType

      argument :attendee_id, ID, loads: Types::BookingsRelated::AttendeeType
      argument :event_option_ids, [ID],
               loads: Types::EventsRelated::EventOptionType,
               required: false
      argument :first_name, String, required: false
      argument :last_name, String, required: false
      argument :email, String, required: false
      argument :phone, String, required: false

      def resolve(attendee:, **args)
        if args[:event_options].is_a? Array
          attendee.attendee_options.destroy_all
          args[:event_options].each do |option|
            option.attendee_options.create!(attendee: attendee, event_option: option)
          end
        end

        attendee.update!(**args.except(:event_options))

        attendee.booking.payments.processing.destroy_all

        notify
        {
          attendee: attendee,
          notification: I18n.t('graphql.mutations.update_attendee.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          attendee: nil
        }
      end

      def authorized?(**inputs)
        attendee = inputs[:attendee]
        booking = attendee.booking

        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !owner?(booking) && !manager?(booking)
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if booking.cancelled?
        return false, { errors: [I18n.t('graphql.errors.event_past')] } if booking.past?
        return false, { errors: [I18n.t('graphql.errors.attendee_removed')] } if attendee.removed?
        return false, { errors: [I18n.t('graphql.errors.general')] } if inputs[:event_options]&.reject { |opt| opt.for_attendee }&.any?

        super
      end

      private

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: booking.firm.primary_email,
          subject: 'Attendee update',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/booking_related',
            locals: {
              title: booking.event.title,
              text: 'Information about attendee was updated'
            }
          )
        )
      end
    end
  end
end
