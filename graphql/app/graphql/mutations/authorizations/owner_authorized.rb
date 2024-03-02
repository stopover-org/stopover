module Mutations
  module Authorizations
    module OwnerAuthorized
      def authorized?(**inputs)
        record = authorized_field(inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !current_user || current_user&.inactive?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !owner?(record)
        super
      end
    end
  end
end
