# frozen_string_literal: true

module Mutations
  module EventsRelated
    class CreatePlacement < BaseMutation
      field :event_placement, Types::EventsRelated::EventPlacementType

      argument :event_id, ID, loads: Types::EventsRelated::EventType
      argument :title, String, required: true
      argument :width_places, Integer, required: true
      argument :height_places, Integer, required: true

      def resolve(event:, **args)
        event_placement = event.event_placements.create!(**args)

        { event_placement: event_placement,
          notification: I18n.t('graphql.mutations.create_placement.notifications.success') }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          event_placement: nil,
          errors: [message]
        }
      end

      private

      def authorized?(**inputs)
        event = inputs[:event]
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless manager?(event)

        super
      end
    end
  end
end