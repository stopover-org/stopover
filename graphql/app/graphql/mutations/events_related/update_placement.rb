# frozen_string_literal: true

module Mutations
  module EventsRelated
    class UpdatePlacement < BaseMutation
      field :event_placement, Types::EventsRelated::EventPlacementType

      argument :placement_id, ID, loads: Types::EventsRelated::EventPlacementType
      argument :title, String, required: true
      argument :width_places, Integer, required: true
      argument :height_places, Integer, required: true

      def resolve(placement:, **args)
        placement.update!(**args)

        { event_placement: placement.reload,
          notification: I18n.t('graphql.mutations.update_placement.notifications.success') }
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
        event = inputs[:placement]
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless manager?(event)

        super
      end
    end
  end
end
