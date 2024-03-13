# frozen_string_literal: true

module Mutations
  module EventsRelated
    class UpdatePlacement < BaseMutation
      AUTHORIZATION_FIELD = 'placement'

      include Mutations::Authorizations::ManagerAuthorized
      include Mutations::FirmsRelated::Authorizations::FirmAuthorized
      include Mutations::EventsRelated::Authorizations::EventAuthorized

      field :event_placement, Types::EventsRelated::EventPlacementType

      argument :placement_id, ID, loads: Types::EventsRelated::EventPlacementType
      argument :title, String, required: true
      argument :width_places, Integer, required: true
      argument :height_places, Integer, required: true

      def resolve(placement:, **args)
        if placement.update(**args)
          { event_placement: placement.reload,
            notification: I18n.t('graphql.mutations.update_placement.notifications.success') }
        else
          { event_placement: placement.reload,
            errors: placement.errors.full_messages }
        end

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
    end
  end
end
