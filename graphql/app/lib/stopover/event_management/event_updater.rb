# frozen_string_literal: true

module Stopover
  module EventManagement
    class EventUpdater
      def initialize(event)
        @event = event
      end

      def execute(**args)
        Event.transaction do
          @event.assign_attributes(args.except(:recurring_dates,
                                               :single_dates,
                                               :event_options,
                                               :images))

          if args[:event_options].present?
            @event.event_options = args[:event_options].map do |option|
              event_option = option[:id]
              event_option.assign_attributes(**option.to_h.except(:id))
              event_option.save!

              event_option
            end
          end

          event.deposit_amount = Money.new(args[:deposit_amount_cents]) if args[:requires_deposit]

          if args[:recurring_dates]
            @event.recurring_days_with_time = Stopover::EventSupport.prepare_dates('recurrent',
                                                                                   args[:recurring_dates])
          end

          if args[:single_dates]
            @event.single_days_with_time = Stopover::EventSupport.prepare_dates('non_recurrent',
                                                                                args[:single_dates])
          end

          if args[:images].present?
            event.images.delete_all
            args[:images].each do |url|
              io_object = Stopover::FilesSupport.url_to_io(url)
              event.images.attach(io_object)
            end
          end

          @event.save!
        end

        @event
      end
    end
  end
end
