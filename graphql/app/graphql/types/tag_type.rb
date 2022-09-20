module Types
  class TagType < Types::ModelObject
    field :id, ID, null: false
    field :title, String, null: false
    field :preview, String
  end
end
