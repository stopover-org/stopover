# frozen_string_literal: true

module Stopover
  module EventManagement
    class EventUpdater
      def initialize(event)
        @event = event
      end

      def execute(**args)
        Event.transaction do
          args[:country] = ISO3166::Country.find_country_by_any_name(args[:country]).iso_short_name if args[:country]

          unless @event.address
            @event.address = Address.new(firm: @event.firm,
                                         country: @event.firm.address&.country)
          end

          @event.address.assign_attributes(args.slice(:full_address,
                                                      :country,
                                                      :region,
                                                      :city,
                                                      :street,
                                                      :house_number,
                                                      :latitude,
                                                      :longitude))
          @event.address.save!

          @event.assign_attributes(args.except(:recurring_dates,
                                               :single_dates,
                                               :event_options,
                                               :images,
                                               :booking_cancellation_options,
                                               :full_address,
                                               :country,
                                               :region,
                                               :city,
                                               :street,
                                               :house_number,
                                               :latitude,
                                               :longitude,
                                               :tour_plan,
                                               :interests))

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

          if args.key?(:images)
            Stopover::FilesSupport.update_images(@event,
                                                 image_urls: args[:images],
                                                 key: 'images')
          end

          if args[:booking_cancellation_options].present?
            args[:booking_cancellation_options].map do |option|
              booking_cancellation_option = option[:id]
              booking_cancellation_option ||= @event.booking_cancellation_options.build
              booking_cancellation_option.assign_attributes(**option.to_h.except(:id))
              booking_cancellation_option.save!
            end
          end

          if args[:interests]
            @event.event_interests.destroy_all
            @event.interests = args[:interests]
          end

          @event.save!

          Stopover::EventManagement::TourPlanUpdater.new(@event)
                                                    .execute(**args)
        end

        @event
      end
    end
  end
end
