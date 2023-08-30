# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class VerifyFirm < BaseMutation
      field :firm, Types::FirmsRelated::FirmType

      def resolve(**_args)
        current_firm.activate!
        {
          firm: current_firm,
          notification: 'Firm was verified!'
        }
      end

      def authorized?(**inputs)
        return false, { errors: ['You are not authorized'] } unless current_user&.active?
        return false, { errors: ['You are not authorized'] } unless service_user?
        return false, { errors: ['Firm already verified'] } if current_firm&.active?
        super
      end
    end
  end
end
