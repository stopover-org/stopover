# frozen_string_literal: true

module Mutations
  class VerifyFirm < BaseMutation
    field :firm, Types::FirmType

    def resolve(**_args)
      raise GraphQL::ExecutionError, "You don't have rights to do it" unless context[:current_user].service_user

      context[:current_user].account.current_firm.activate!
      {
        firm: context[:current_user].account.current_firm
      }
    end
  end
end
