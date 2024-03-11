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
        interest = Interest.create(inputs.except(:preview))

        io_object = Stopover::FilesSupport.url_to_io(inputs[:preview])

        interest.preview.attach(io_object)

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
