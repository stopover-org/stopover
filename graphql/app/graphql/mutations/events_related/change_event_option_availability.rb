# frozen_string_literal: true

module Mutations
  module EventsRelated
    class ChangeEventOptionAvailability < BaseMutation
      AUTHORIZATION_FIELD = 'event_option'

      include Mutations::Authorizations::ManagerAuthorized
      include Mutations::FirmsRelated::Authorizations::FirmAuthorized
      include Mutations::EventsRelated::Authorizations::EventAuthorized

      field :event_option, Types::EventsRelated::EventOptionType

      argument :event_option_id, ID, loads: Types::EventsRelated::EventOptionType

      def resolve(event_option:, **_args)
        message = nil
        case event_option.status
        when 'available'
          event_option.disable!
          message = I18n.t('graphql.mutations.change_event_option_availability.notifications.unavailable')
        when 'not_available'
          event_option.restore!
          message = I18n.t('graphql.mutations.change_event_option_availability.notifications.available')
        end

        {
          event_option: event_option,
          notification: message
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          event_option: nil,
          errors: [message]
        }
      end
    end
  end
end
