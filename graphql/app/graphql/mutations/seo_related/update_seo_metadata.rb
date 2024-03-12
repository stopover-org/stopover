# frozen_string_literal: true

module Mutations
  module SeoRelated
    class UpdateSeoMetadata < BaseMutation
      include Mutations::Authorizations::ServiceUserAuthorized

      field :seo_metadatum, Types::SeoRelated::SeoMetadatumType

      argument :seo_metadatum_id, ID, loads: Types::SeoRelated::SeoMetadatumType
      argument :title, String
      argument :description, String
      argument :keywords, String
      argument :language, String

      def resolve(seo_metadatum:, **args)
        seo_metadatum.assign_attributes(args)
        seo_metadatum.save!

        {
          seo_metadatum: seo_metadatum,
          notification: I18n.t('graphql.mutations.update_seo_metadata.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          seo_metadatum: nil,
          errors: [message]
        }
      end
    end
  end
end
