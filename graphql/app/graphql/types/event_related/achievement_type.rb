# frozen_string_literal: true

module Types
  module EventRelated
    class AchievementType < Types::ModelObject
      field :id, ID, null: false
      field :title, String, null: false
      field :preview, String
    end
  end
end
