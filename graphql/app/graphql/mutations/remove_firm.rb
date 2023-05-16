# frozen_string_literal: true

module Mutations
  class RemoveFirm < BaseMutation
    field :firm, Types::FirmType

    def resolve(**_args)
      context[:current_user].account.firm.soft_delete!
      {
        firm: context[:current_user].account.firm.reload
      }
    end
  end
end
