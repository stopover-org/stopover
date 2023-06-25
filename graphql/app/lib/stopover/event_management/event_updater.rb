# frozen_string_literal: true

module Stopover
  module EventManagement
    class EventUpdater
      def initialize(event, context)
        @event = event
        @context = context
      end

      def execute(**args)
        @event.assign_attributes(args.except(:recurring_dates,
                                             :single_dates,
                                             :event_options,
                                             :base64_images))
        @event.firm = @context[:current_user].account.current_firm
        if args[:event_options].present?
          @event.event_options = args[:event_options].map do |option|
            event_option = if option[:id]
                             EventOption.find(option[:id])
                           else
                             EventOption.new
                           end
            event_option.assign_attributes(**option.except(:id))
          end
        end

        @event.recurring_days_with_time = Stopover::EventSupport.prepare_dates('recurrent',
                                                                               args[:recurring_dates])
        @event.single_days_with_time = Stopover::EventSupport.prepare_dates('non_recurrent',
                                                                            args[:single_dates])
        @event.save!

        @event
      end
    end
  end
end
