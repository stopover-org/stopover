# frozen_string_literal: true

namespace :graphql do
  task dump_schema: :environment do
    # Get a string containing the definition in GraphQL IDL:
    schema_definition = GraphqlSchema.to_definition
    # Choose a place to write the schema dump:
    schema_path = 'schema.graphql'
    # Write the schema dump to that file:
    File.write(Rails.root.join(schema_path), schema_definition)
    p "Updated #{schema_path}"
  end
end
