# frozen_string_literal: true

# rubocop:disable Style/ClassVars
module Mutations
  module Authorization
    extend ActiveSupport::Concern

    included do
      @@guards = {}

      def self.manager_only
        @@guards[self] = {} if @@guards[self].nil?
        @@guards[self][:manager_only] = true

        nil
      end

      def self.service_user_only
        @@guards[self] = {} if @@guards[self].nil?
        @@guards[self][:service_user_only] = true

        nil
      end

      def self.authorized_only
        @@guards[self] = {} if @@guards[self].nil?
        @@guards[self][:authorized_only] = true

        nil
      end

      def self.authorize(lambda_fn)
        @@guards[self] = {} if @@guards[self].nil?
        @@guards[self][:authorize_lambda] = lambda_fn

        nil
      end

      def current_user
        context[:current_user]
      end

      def current_account
        current_user&.account
      end

      def current_firm
        current_account&.current_firm
      end

      def permit!(**args)
        mutation_guard = self.class
        return if @@guards[mutation_guard].nil?

        if @@guards[mutation_guard][:authorized_only] && current_user&.temporary?
          @permission_error = {
            errors: ['You are not authorized'],
              notification: 'You need to Sign In',
              redirect_url: '/auth/sign_in'
          }
        end

        if @@guards[mutation_guard][:manager_only] && current_user&.nil?
          @permission_error = {
            errors: ['You are not authorized'],
              notification: 'You don\'t have permission',
              redirect_url: '/errors/not_authorized'
          }
        end

        if @@guards[mutation_guard][:service_user_only] && !current_user&.service_user
          @permission_error = {
            errors: ['You are not authorized'],
              notification: 'You don\'t have permission',
              redirect_url: '/errors/not_authorized'
          }
        end

        if @@guards[mutation_guard][:authorize_lambda]
          err = @@guards[mutation_guard][:authorize_lambda]&.call(**args, current_user: current_user, current_account: current_account, current_firm: current_firm)

          if err
            @permission_error = {
              errors: [err],
                notification: 'You don\'t have permission',
                redirect_url: '/errors/not_authorized'
            }
          end
        end

        nil
      end
    end
  end
end

# rubocop:enable Style/ClassVars
