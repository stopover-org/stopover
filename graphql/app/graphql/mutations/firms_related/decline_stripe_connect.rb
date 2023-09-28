# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class DeclineStripeConnect < BaseMutation
      field :stripe_connect, Types::FirmsRelated::StripeConnectType

      argument :stripe_connect_id, ID, loads: Types::FirmsRelated::StripeConnectType
      argument :soft, Boolean, required: true

      def resolve(stripe_connect:, soft:)
        if soft
          stripe_connect.deactivate!
        else
          stripe_connect.remove!
        end

        { stripe_connect: stripe_connect,
          notification: soft ? I18n.t('graphql.mutations.decline_stripe_connect.notifications.declined') : I18n.t('graphql.mutations.decline_stripe_connect.notifications.removed') }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        { errors: [message],
          stripe_connect: nil }
      end

      def authorized?(**_inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if current_user&.temporary?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if current_user&.inactive?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user&.service_user
        return false, { errors: [I18n.t('graphql.errors.general')] } unless current_firm

        super
      end
    end
  end
end
