# frozen_string_literal: true

module Mutations
  module Authorizations
    module ManagerAuthorized
      def authorized?(**inputs)
        record = authorization_field(inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !current_user || current_user&.inactive?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless manager?(record)
        super
      end
    end
  end
end
