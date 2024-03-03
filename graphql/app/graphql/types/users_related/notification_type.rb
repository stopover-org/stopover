# frozen_string_literal: true

module Types
  module UsersRelated
    class NotificationType < Types::ModelObject
      field :id, ID
      field :content, String
      field :subject, String
      field :delivery_method, String
      field :from, String
      field :sent_at, Types::DateTimeType
      field :to, String
    end
  end
end
