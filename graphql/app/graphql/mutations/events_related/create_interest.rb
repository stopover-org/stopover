# frozen_string_literal: true

module Mutations
  module EventsRelated
    class CreateInterest < BaseMutation
      include Mutations::Authorizations::ServiceUserAuthorized

      argument :title, String, required: true
      argument :slug, String, required: true
      argument :preview, String, required: true
      argument :description, String, required: true

      field :interest, Types::EventsRelated::InterestType

      def resolve(**inputs)
        interest = Interest.new(inputs.except(:preview))

        if inputs.key?(:preview)
          Stopover::FilesSupport.attach_image(interest,
                                              image_url: inputs[:preview],
                                              key: 'preview')
        end
        if interest.save
          { interest: interest.errors.empty? ? interest : nil,
            notification: I18n.t('graphql.mutations.create_interest.notifications.success') }
        else
          { interest: interest.errors.empty? ? interest : nil,
            errors: interest.errors.full_messages }
        end

        { interest: interest.errors.empty? ? interest : nil,
          notification: interest.errors.empty? ? I18n.t('graphql.mutations.create_interest.notifications.success') : nil,
          errors: interest.errors.full_messages }
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
