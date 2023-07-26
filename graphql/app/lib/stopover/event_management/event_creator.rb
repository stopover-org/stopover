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
                                              :deposit_amount_cents))
          event.firm = @context[:current_user].account.current_firm
          if args[:event_options].present?
            event.event_options = args[:event_options].map do |option|
              event_option = EventOption.new
              event_option.assign_attributes(**option)
            end
          end

          event.deposit_amount = Money.new(args[:deposit_amount_cents]) if args[:requires_deposit]

          event.recurring_days_with_time = Stopover::EventSupport.prepare_dates('recurrent',
                                                                                args[:recurring_dates])
          event.single_days_with_time = Stopover::EventSupport.prepare_dates('non_recurrent',
                                                                             args[:single_dates])

          unless args[:images].empty?
            args[:images].each do |base64_image|
              io_object = Stopover::FilesSupport.url_to_io(base64_image)
              event.images.attach(io_object)
            end
          end

          event.save!
        end

        event
      end
    end
  end
end
