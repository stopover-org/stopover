# frozen_string_literal: true

module Mutations
  module Authorizations
    module ServiceUserAuthorized
      def authorized?(**inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user&.service_user

        super
      end
    end
  end
end
