# frozen_string_literal: true

module Subscriptions
  class BaseSubscription < GraphQL::Schema::Subscription
    # Hook up base classes
    argument_class Types::BaseArgument
    field_class Types::BaseField
    object_class Types::BaseObject

    def current_application_context
      context[:current_application_context]
    end
  end
end
