# frozen_string_literal: true

module Mutations
  module FirmsMutations
    class VerifyFirm < BaseMutation
      service_user_only
      field :firm, Types::FirmType

      def resolve(**_args)
        current_firm.activate!
        {
          firm: current_firm
        }
      end
    end
  end
end
