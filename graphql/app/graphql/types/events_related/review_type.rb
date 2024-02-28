# frozen_string_literal: true

module Types
  module EventsRelated
    class ReviewType < Types::ModelObject
      field :author, String
      field :attendees_count, Integer

      field :description, String
      field :created_at, Types::DateTimeType

      field :rating, Integer

      def rating
        object.rating.rating_value
      end
    end
  end
end
