# frozen_string_literal: true

module Types
  class BaseField < GraphQL::Schema::Field
    argument_class Types::BaseArgument

    def initialize(*args, require_service_user: false, require_manager: false, **kwargs, &block)
      # Service User has the highest permission
      @require_service_user = require_service_user
      # Manager has permission to operate with firm
      @require_manager = @require_service_user || require_manager
      super(*args, **kwargs, &block)
    end

    def visible?(ctx)
      if @require_service_user
        super && ctx[:current_user]&.service_user
      elsif @require_manager
        super && ctx[:current_user]&.account&.current_firm
      else
        super
      end
    end
  end
end
