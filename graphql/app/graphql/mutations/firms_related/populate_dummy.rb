# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class PopulateDummy < BaseMutation
      AUTHORIZATION_FIELD = 'current_firm'

      include Mutations::Authorizations::ManagerAuthorized
      include Mutations::FirmsRelated::Authorizations::OnboardingFirmAuthorized

      field :firm, Types::FirmsRelated::FirmType

      def resolve; end
    end
  end
end
