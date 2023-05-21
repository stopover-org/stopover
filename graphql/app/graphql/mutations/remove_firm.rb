# frozen_string_literal: true

module Mutations
  class RemoveFirm < BaseMutation
    field :firm, Types::FirmType

    def resolve(**_args)
      context[:current_user].account.current_firm.soft_delete!
      {
        firm: context[:current_user].account.current_firm
      }
    end
  end
end
