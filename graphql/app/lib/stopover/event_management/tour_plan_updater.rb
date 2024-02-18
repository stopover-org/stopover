# frozen_string_literal: true

module Stopover
  module EventManagement
    class TourPlanUpdater
      def initialize(event)
        @event = event
      end

      def execute(**args)
        return unless args[:tour_plan]
        tour_plan_args = args[:tour_plan].to_h
        TourPlan.transaction do
          tour_plan = tour_plan_args[:id] ? GraphqlSchema.object_from_id(tour_plan_args[:id]) : @event.tour_plans.build
          tour_plan.assign_attributes(tour_plan_args.slice(:title, :description))
          tour_plan.image.attach(Stopover::FilesSupport.url_to_io(tour_plan[:image])) if tour_plan[:image]

          place_ids = []

          tour_plan_args[:tour_places].map do |place|
            tour_place = place[:id] ? GraphqlSchema.object_from_id(place[:id]) : tour_plan.tour_places.build
            tour_place.assign_attributes(place.slice(:title, :description, :duration_time))
            tour_place.image.attach(Stopover::FilesSupport.url_to_io(place[:image])) if place[:image]
            if tour_place.persisted?
              tour_place.save!
              place_ids << tour_place.id if tour_place.persisted?
            end
          end

          places_to_remove = tour_plan.tour_place_ids - place_ids

          TourPlace.where(id: places_to_remove).destroy_all if places_to_remove

          tour_plan.save!
        end
      end
    end
  end
end
