class GraphqlSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # For batch-loading (see https://graphql-ruby.org/dataloader/overview.html)
  use GraphQL::Dataloader

  # GraphQL-Ruby calls this when something goes wrong while running a query:
  def self.type_error(err, context)
    # if err.is_a?(GraphQL::InvalidNullError)
    #   # report to your bug tracker here
    #   return nil
    # end
    super
  end

  # Union and Interface Resolution
  def self.resolve_type(abstract_type, obj, ctx)
    Object.const_get("Types::#{obj.class.name}Type")
  end

  # Relay-style Object Identification:

  # Return a string UUID for `object`
  def self.id_from_object(object, type_definition = nil, query_ctx = {})
    object_type = object.try(:graphql_object_type) || object.try(:dig, :graphql_object_type)
    is_record = object_type == :record
    type_name = is_record ? object.class.table_name : object_type
    unique_id = object.try(:id) || object.dig(:id)

    GraphQL::Schema::UniqueWithinType.encode(type_name, unique_id)
  end

  # Given a string UUID, find the object
  def self.object_from_id(uuid, ctx = nil)
    raise GraphQL::ExecutionError.new('Cannot parse ID, invalid value') if !uuid.is_a?(String) || uuid.is_a?(Integer) || uuid.try(:to_i).try(:positive?)

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
    elsif type_name.to_sym == :candidate
      # For this type, we unpack it and get the id and job_id then return a hash with both
      id_parts = unique_id.split('_')
      {
        id: id_parts[0].to_i,
        job_id: id_parts[1].to_i
      }
    else
      raise InternalServerError, "Unknown type: #{type_name}"
    end
  end
end
