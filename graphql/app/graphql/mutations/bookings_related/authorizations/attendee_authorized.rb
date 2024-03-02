# frozen_string_literal: true

module Mutations
  module BookingsRelated
    module Authorizations
      module AttendeeAuthorized
        def authorized?(**inputs)
          record = authorization_field(inputs)
          record = inputs[:attendee] unless record.is_a?(Attendee)

          return false, { errors: [I18n.t('graphql.errors.attendee_removed')] } if record.removed?
          super
        end
      end
    end
  end
end
