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

          @event.deposit_amount = if args[:requires_deposit]
                                    Money.new(args[:deposit_amount_cents])
                                  else
                                    Money.new(0)
                                  end

          if args[:recurring_dates]
            @event.recurring_days_with_time = Stopover::EventSupport.prepare_dates('recurrent',
                                                                                   args[:recurring_dates])
          end

          if args[:single_dates]
            @event.single_days_with_time = Stopover::EventSupport.prepare_dates('non_recurrent',
                                                                                args[:single_dates])
          end

          if args[:images].present?
            images_to_remove = @event.images
                                     .select do |image|
              args[:images].map { |img| URI.parse(img).path }
                           .exclude?(URI.parse(image.url).path)
            end
            images_to_remove.each do |image|
              image.purge
            end
            images_to_attach = []

            args[:images].each do |url|
              next if @event.images.select { |image| URI.parse(url).path == URI.parse(image.url).path }.any?

              images_to_attach << Stopover::FilesSupport.url_to_io(url)
            rescue StandardError => e
              Sentry.capture_exception(e) if Rails.env.production?
            end

            @event.images.attach(images_to_attach)
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
