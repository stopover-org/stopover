# frozen_string_literal: true

module Stopover
  module EventManagement
    class EventUpdater
      def initialize(event)
        @event = event
      end

      def execute(**args)
        @event.assign_attributes(args.except(:recurring_dates,
                                             :single_dates,
                                             :event_options,
                                             :images))

        @event.event_options = args[:event_options].map do |option|
          event_option = option[:id]
          event_option.assign_attributes(**option.to_h.except(:id))
          event_option.save!

          event_option
        end

        if args[:recurring_dates]
          @event.recurring_days_with_time = Stopover::EventSupport.prepare_dates('recurrent',
                                                                                 args[:recurring_dates])
        end

        if args[:single_dates]
          @event.single_days_with_time = Stopover::EventSupport.prepare_dates('non_recurrent',
                                                                              args[:single_dates])
        end

        @event.save!

        @event
      end
    end
  end
end
