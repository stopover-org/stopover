# frozen_string_literal: true

module Types
  class AchievementType < Types::ModelObject
    field :title, String
    field :preview, String
  end
end
