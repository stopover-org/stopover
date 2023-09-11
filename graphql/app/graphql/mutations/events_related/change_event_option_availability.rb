# frozen_string_literal: true

module Mutations
  module EventsRelated
    class ChangeEventOptionAvailability < BaseMutation
      field :event_option, Types::EventsRelated::EventOptionType

      argument :event_option_id, ID, loads: Types::EventsRelated::EventOptionType

      def resolve(event_option:, **_args)
        message = nil
        case event_option.status
        when 'available'
          event_option.disable!
          message = 'Event Option is not available!'
        when 'not_available'
          event_option.restore!
          message = 'Event Option is available!'
        end

        {
          event_option: event_option,
          notification: message
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          booking: nil,
          errors: [e.message]
        }
      end

      private

      def authorized?(**inputs)
        event = inputs[:event_option].event

        return false, { errors: ['You are not authorized'] } unless manager?(event)
        return false, { errors: ['Event removed'] } if event.removed?

        super
      end
    end
  end
end
