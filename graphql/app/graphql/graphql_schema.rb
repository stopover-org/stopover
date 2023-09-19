# frozen_string_literal: true

class GraphqlSchema < GraphQL::Schema
  use GraphQL::Schema::AlwaysVisible
  use GraphQL::Subscriptions::ActionCableSubscriptions

  mutation(Types::MutationType)
  query(Types::QueryType)
  subscription(Types::SubscriptionType)

  # For batch-loading (see https://graphql-ruby.org/dataloader/overview.html)
  use GraphQL::Dataloader

  # GraphQL-Ruby calls this when something goes wrong while running a query:

  # Union and Interface Resolution
  def self.resolve_type(abstract_type, _obj, _ctx)
    abstract_type
  end

  # Relay-style Object Identification:

  # Return a string UUID for `object`
  def self.id_from_object(object, _type_definition = nil, _query_ctx = {})
    object_type = object.try(:graphql_object_type) || object.try(:dig, :graphql_object_type)
    is_record = object_type == :record
    type_name = is_record ? object.class.table_name : object_type
    unique_id = object.try(:id) || object[:id]

    GraphQL::Schema::UniqueWithinType.encode(type_name, unique_id)
  end

  # Given a string UUID, find the object
  def self.object_from_id(uuid, ctx = nil)
    raise GraphQL::ExecutionError, 'Cannot parse ID, invalid value' if !uuid.is_a?(String) || uuid.is_a?(Integer) || uuid.try(:to_i).try(:positive?)

    type_name, unique_id = GraphQL::Schema::UniqueWithinType.decode(uuid)

    # Check if type_name matches a model constant
    if Object.const_defined?(type_name.classify, true)
      model_class = type_name.classify.constantize
      # Use dataloader if available to load the record by ID, otherwise fall back to regular loading
      # ctx might be nil in specs, that's why we have the fallback
      if ctx&.try(:dataloader)
        ctx.dataloader.with(Sources::RecordById, model_class).load(unique_id)
      else
        model_class.find(unique_id)
      end
    else
      raise InternalServerError, "Unknown type: #{type_name}"
    end
  end
end
