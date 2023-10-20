# frozen_string_literal: true

module Stopover
  module EventManagement
    class EventCreator
      def initialize(context)
        @context = context
      end

      def execute(**args)
        event = Event.new

        Event.transaction do
          event.assign_attributes(args.except(:recurring_dates,
                                              :single_dates,
                                              :event_options,
                                              :images,
                                              :deposit_amount_cents,
                                              :booking_cancellation_options))
          event.firm = @context[:current_user].account.current_firm
          if args[:event_options].present?
            args[:event_options].map do |option|
              event_option = event.event_options.build
              event_option.assign_attributes(**option)
              event_option.save!
            end
          end

          event.deposit_amount = Money.new(args[:deposit_amount_cents]) if args[:requires_deposit]

          event.recurring_days_with_time = Stopover::EventSupport.prepare_dates('recurrent',
                                                                                args[:recurring_dates])
          event.single_days_with_time = Stopover::EventSupport.prepare_dates('non_recurrent',
                                                                             args[:single_dates])

          unless args[:images].empty?
            images_to_attach = []

            args[:images].each do |url|
              images_to_attach << Stopover::FilesSupport.url_to_io(url)
            rescue StandardError => e
              Sentry.capture_exception(e) if Rails.env.production?
            end

            @event.images.attach(images_to_attach)
          end

          if args[:booking_cancellation_options].present?
            args[:booking_cancellation_options].map do |option|
              booking_cancellation_option = event.booking_cancellation_options.build
              booking_cancellation_option.assign_attributes(**option)
              booking_cancellation_option.save!
            end
          end

          event.save!
        end

        event
      end
    end
  end
end
