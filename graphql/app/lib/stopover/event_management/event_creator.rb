# frozen_string_literal: true

module Stopover
  module EventManagement
    class EventCreator
      def initialize(context)
        @context = context
      end

      def execute(**args)
        event = Event.new
        event.assign_attributes(args.except(:recurring_dates,
                                            :single_dates,
                                            :event_options,
                                            :base64_images))
        event.firm = @context[:current_user].account.current_firm
        if args[:event_options].present?
          event.event_options = args[:event_options].map do |option|
            event_option = EventOption.new
            event_option.assign_attributes(**option)
          end
        end

        event.recurring_days_with_time = Stopover::EventSupport.prepare_dates('recurrent',
                                                                              args[:recurring_dates])
        event.single_days_with_time = Stopover::EventSupport.prepare_dates('non_recurrent',
                                                                           args[:single_dates])
        event.save!

        event
      end
    end
  end
end
