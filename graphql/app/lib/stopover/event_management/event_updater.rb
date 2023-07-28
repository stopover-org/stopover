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
                                               :images,
                                               :booking_cancellation_options))

          if args[:event_options].present?
            args[:event_options].map do |option|
              event_option = option[:id]
              event_option ||= @event.event_options.build
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

          if args[:booking_cancellation_options].present?
            args[:booking_cancellation_options].map do |option|
              booking_cancellation_option = option[:id]
              booking_cancellation_option ||= @event.booking_cancellation_options.build
              booking_cancellation_option.assign_attributes(**option.to_h.except(:id))
              booking_cancellation_option.save!
            end
          end

          @event.save!
        end

        @event
      end
    end
  end
end
