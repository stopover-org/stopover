# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def graphql_object_type
    :record
  end

  def relay_id
    GraphqlSchema.id_from_object(self)
  end
end
