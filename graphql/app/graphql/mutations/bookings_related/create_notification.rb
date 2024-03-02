# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class CreateNotification < BaseMutation
      AUTHORIZATION_FIELD = 'booking'
      include Mutations::Authorizations::ManagerAuthorized
      include Mutations::BookingsRelated::Authorizations::BookingAuthorized

      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType
      argument :subject, String
      argument :content, String

      field :booking, Types::BookingsRelated::BookingType

      def resolve(booking:, **args)
        booking.notifications.create!(subject: args[:subject],
                                      content: Stopover::MailProvider.prepare_content(
                                        file: 'mailer/firms/bookings/custom_notification',
                                        locals: {
                                          content: args[:content]
                                        }
                                      ),
                                      notification_type: 'custom',
                                      delivery_method: 'email',
                                      to: booking.account.primary_email)
        {
          booking: booking.reload,
          notification: I18n.t('graphql.mutations.create_notification.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          booking: nil,
          errors: [message]
        }
      end
    end
  end
end
