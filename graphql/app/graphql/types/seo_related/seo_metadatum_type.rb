# frozen_string_literal: true

module Types
  module SeoRelated
    class SeoMetadatumType < Types::ModelObject
      field :title, String, null: false
      field :description, String, null: false
      field :keywords, String, null: false
      field :language, String, null: false

      def title
        if current_user.service_user
          object.title
        else
          object.translate(:title)
        end
      end

      def description
        if current_user.service_user
          object.description
        else
          object.translate(:description)
        end
      end
    end

    def keywords
      if current_user.service_user
        object.keywords
      else
        object.translate(:keywords)
      end
    end
  end
end
