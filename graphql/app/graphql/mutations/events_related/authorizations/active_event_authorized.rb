# frozen_string_literal: true

module Mutations
  module EventsRelated
    module Authorizations
      module ActiveEventAuthorized
        def authorized?(**inputs)
          event = authorization_field(inputs)

          return false, { errors: [I18n.t('graphql.errors.event_not_verified')] } if event.draft?
          return false, { errors: [I18n.t('graphql.errors.event_removed')] } if event.removed?
          super
        end
      end
    end
  end
end
