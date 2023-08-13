# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    include Mutations::Authorization

    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    field :errors, [String]
    field :notification, String
    field :redirect_url, String

    def ready?(**args)
      permit!(**args)

      return false, @permission_error if @permission_error

      true
    end
  end
end
