# frozen_string_literal: true

module Mutations
  class VerifyFirm < BaseMutation
    field :firm, Types::FirmType

    def resolve(**_args)
      context[:current_user].account.current_firm.activate!
      {
        firm: context[:current_user].account.current_firm
      }
    end
  end
end
