# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    field :errors, [String]
    field :notification, String

    def current_user
      context[:current_user]
    end

    def current_account
      context[:current_user]&.account
    end

    def current_firm
      context[:current_user]&.account&.current_firm
    end

    def service_user?
      context[:current_user]&.service_user
    end
  end
end
