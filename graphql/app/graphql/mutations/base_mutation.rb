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
      return nil unless context[:current_user]&.account&.current_firm
      return nil if context[:current_user]&.account&.current_firm&.removed?

      context[:current_user]&.account&.current_firm
    end

    def service_user?
      context[:current_user]&.service_user
    end

    def manager?(record)
      return record.firm == current_firm if record.respond_to?(:firm)

      false
    end

    def owner?(record)
      return record.account == current_account if record.respond_to?(:account)

      false
    end

    def authorization_field(inputs)
      inputs[self.class::AUTHORIZATION_FIELD.to_sym]
    end
  end
end
