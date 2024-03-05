# frozen_string_literal: true

module Mutations
  module FirmsRelated
    module Authorizations
      module OnboardingFirmAuthorized
        def authorized?
          return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_firm&.firm_type_onboarding?
        end
      end
    end
  end
end
