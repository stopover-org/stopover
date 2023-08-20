# frozen_string_literal: true

module Mutations
  module AuthRelated
    class SignOut < BaseMutation
      field :signed_out, Boolean
      def resolve
        context[:cookies].encrypted[Stopover::AuthorizationSupport::COOKIE_KEY] = nil
        context[:current_user] = nil

        {
          signed_out: true,
          notification: 'You were signed out successfully'
        }
      end
    end
  end
end
