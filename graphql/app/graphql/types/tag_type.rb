# frozen_string_literal: true

module Types
  class TagType < Types::ModelObject
    field :id, ID, null: false
    field :title, String, null: false
    field :link, String

    def link
      "/tags/#{object.id}"
    end

    def title
      if current_firm == object.firm
        object.title
      else
        object.translate(:title)
      end
    end
  end
end
