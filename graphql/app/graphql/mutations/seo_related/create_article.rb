# frozen_string_literal: true

module Mutations
  module SeoRelated
    class CreateArticle < BaseMutation
      include Mutations::Authorizations::ServiceUserAuthorized

      argument :title, String
      argument :content, String
      argument :language, String
      argument :image, String, required: false

      field :article, Types::SeoRelated::ArticleType

      def resolve(**args)
        article = Article.new(args.except(:image))

        if args.key?(:image)
          Stopover::FilesSupport.attach_image(article,
                                              image_url: args[:image],
                                              key: 'image')
        end

        if article.save
          {
            article: article,
            notification: I18n.t('graphql.mutations.create_article.notifications.success')
          }
        else
          {
            article: article,
            errors: article.errors.full_messages
          }
        end

        {
          article: article,
          notification: article.errors.empty? ? I18n.t('graphql.mutations.create_article.notifications.success') : nil,
          errors: article.errors.full_messages
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          article: nil,
          errors: [message]
        }
      end
    end
  end
end
