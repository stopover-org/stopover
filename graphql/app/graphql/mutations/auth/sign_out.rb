# frozen_string_literal: true

module Mutations
  module Auth
    class SignOut < BaseMutation
      field :signed_out, Boolean
      def resolve
        context[:cookies].encrypted[Stopover::AuthorizationSupport::COOKIE_KEY] = nil
        context[:current_user] = nil

        {
          signed_out: true
        }
      end
    end
  end
end
