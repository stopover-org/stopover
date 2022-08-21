module Types
  class TagType < Types::ModelObject
    field :id, ID
    field :title, String
    field :preview, String
  end
end