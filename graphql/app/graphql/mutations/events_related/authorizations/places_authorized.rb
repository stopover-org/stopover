# frozen_string_literal: true

module Mutations
  module EventsRelated
    module Authorizations
      module PlacesAuthorized
        def authorized?(**inputs)
          record = authorization_field(inputs)
          if record.event.max_attendees && record.event.attendees
                                                 .where.not(status: 'removed')
                                                 .count >= record.event.max_attendees
            return false, { errors: [I18n.t('graphql.errors.all_places_reserved')] }
          end

          super
        end
      end
    end
  end
end
