# frozen_string_literal: true

module Mutations
  module EventsRelated
    class UpdateInterest < BaseMutation
      include Mutations::Authorizations::ServiceUserAuthorized

      argument :interest_id, ID, loads: Types::EventsRelated::InterestType
      argument :title, String, required: true
      argument :slug, String, required: true
      argument :preview, String, required: true
      argument :description, String, required: true

      field :interest, Types::EventsRelated::InterestType

      def resolve(interest:, **inputs)
        interest.assign_attributes(inputs.except(:preview))

        Stopover::FilesSupport.attach_image(interest, image_url: inputs[:preview], key: 'preview') if inputs.key?(:preview)

        if interest.save
          { interest: interest,
            notification: I18n.t('graphql.mutations.create_interest.notifications.success') }
        else
          { interest: interest,
            errors: interest.errors.full_messages }
        end
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          interest: nil,
          errors: [message]
        }
      end
    end
  end
end
