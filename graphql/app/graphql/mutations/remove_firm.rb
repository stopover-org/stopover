# frozen_string_literal: true

module Mutations
  class RemoveFirm < BaseMutation
    field :firm, Types::FirmType

    def resolve(**_args)
      RemoveFirmJob.perform_later(context[:current_user].account.firm.id)

      {
        firm: context[:current_user].account.firm
      }
    end
  end
end
