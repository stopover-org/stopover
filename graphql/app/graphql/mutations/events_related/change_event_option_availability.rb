# frozen_string_literal: true

module Mutations
  module EventsRelated
    class ChangeEventOptionAvailability < BaseMutation
      field :event_option, Types::EventsRelated::EventOptionType

      argument :event_option_id, ID, loads: Types::EventsRelated::EventOptionType

      def resolve(event_option:, **_args)
        case event_option.status
        when 'available'
          event_option.disable!
        when 'not_available'
          event_option.restore!
        end

        {
          event_option: event_option
        }
      end
    end
  end
end
