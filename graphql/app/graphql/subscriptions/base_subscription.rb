# frozen_string_literal: true

module Subscriptions
  class BaseSubscription < GraphQL::Schema::Subscription
    # Hook up base classes
    object_class Types::BaseObject
    field_class Types::BaseField
    argument_class Types::BaseArgument

    def current_application_context
      context[:current_application_context]
    end
  end
end
