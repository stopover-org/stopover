# frozen_string_literal: true

module Types
  class ModelObject < Types::BaseObject
    edge_type_class(Types::BaseEdge)
    connection_type_class(Types::BaseConnection)

    implements GraphQL::Types::Relay::Node
    global_id_field :id

    def relay_id
      object.id
    end

    def current_user
      context[:current_user]
    end

    def current_account
      context[:current_user]&.account
    end

    def current_firm
      current_account&.current_firm
    end
  end
end
