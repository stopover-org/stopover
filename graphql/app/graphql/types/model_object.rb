# frozen_string_literal: true

module Types
  class ModelObject < Types::BaseObject
    # edge_type_class(Types::BaseEdge)
    # connection_type_class(Types::BaseConnection)

    # implements GraphQL::Types::Relay::Node
    global_id_field :relay_id
  end
end
