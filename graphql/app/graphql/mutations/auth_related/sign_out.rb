# frozen_string_literal: true

module Mutations
  module AuthRelated
    class SignOut < BaseMutation
      field :signed_out, Boolean
      def resolve
        context[:cookies][Stopover::AuthorizationSupport::COOKIE_KEY] = nil
        context[:current_user] = nil

        {
          signed_out: true,
          notification: I18n.t('graphql.mutations.sign_out.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          attendee: nil
        }
      end
    end
  end
end
