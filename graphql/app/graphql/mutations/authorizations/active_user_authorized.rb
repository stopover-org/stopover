# frozen_string_literal: true

module Mutations
  module Authorizations
    module ActiveUserAuthorized
      def authorized?(**inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user&.active?

        super
      end
    end
  end
end
