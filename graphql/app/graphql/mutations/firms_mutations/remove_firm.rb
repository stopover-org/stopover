# frozen_string_literal: true

module Mutations
  module FirmsMutations
    class RemoveFirm < BaseMutation
      manager_only
      field :firm, Types::FirmType

      def resolve(**_args)
        current_firm.remove!
        {
          firm: current_firm
        }
      end
    end
  end
end
