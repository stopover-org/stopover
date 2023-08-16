# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class RemoveFirm < BaseMutation
      field :firm, Types::FirmsRelated::FirmType

      def resolve(**_args)
        context[:current_user].account.current_firm.remove!
        {
          firm: context[:current_user].account.current_firm
        }
      end
    end
  end
end
