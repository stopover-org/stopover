# frozen_string_literal: true

module Mutations
  module FirmsRelated
    module Authorizations
      module OnboardingFirmAuthorized
        def authorized?(**inputs)
          record = authorization_field(inputs)
          record = record.try(:firm) unless record.is_a?(Firm)
          record = current_firm unless record.is_a?(Firm)

          return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless record&.firm_type_onboarding?
          super
        end
      end
    end
  end
end
