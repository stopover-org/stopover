# frozen_string_literal: true

module Mutations
  module EventsRelated
    module Authorizations
      module EventAuthorized
        def authorized?(**inputs)
          record = authorization_field(inputs)
          record = record.try(:event) unless record.is_a?(Event)

          return false, { errors: [I18n.t('graphql.errors.event_removed')] } if record.removed?

          super
        end
      end
    end
  end
end
