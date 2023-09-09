# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class RemoveFirm < BaseMutation
      field :firm, Types::FirmsRelated::FirmType

      def resolve(**_args)
        firm = context[:current_user].account.current_firm
        firm.remove!
        {
          firm: firm.reload,
          notification: 'Firm was removed'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        { errors: [e.message], notification: 'Something went wrong' }
      end

      def authorized?(**inputs)
        return false, { errors: ['You are not authorized'] } unless current_user
        return false, { errors: ['You are not authorized'] } if current_user&.temporary?
        return false, { errors: ['You are not authorized'] } if current_user&.inactive?
        return false, { errors: ['You don\'t have firm'] } unless current_firm
        return false, { errors: ['Firm was removed'] } if current_firm.removed?

        super
      end
    end
  end
end
