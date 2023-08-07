# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    field :errors, [String]
    field :notification, String
    field :redirect_url, String

    @@manager_only = false
    @@service_user_only = false
    @@authorized_only = false
    @@authorize_lambda = false

    def self.manager_only
      @@manager_only = true
      @@service_user_only = true
      @@authorized_only = true

      nil
    end

    def self.service_user_only
      @@service_user_only = true
      @@manager_only = false
      @@authorized_only = true

      nil
    end

    def self.authorized_only
      @@service_user_only = false
      @@manager_only = false
      @@authorized_only = true

      nil
    end

    def self.authorize(lambda_fn)
      @@authorize_lambda = lambda_fn
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
      if @@authorized_only && current_user&.temporary?
        @permission_error = {
          errors: ['You are not authorized'],
          notification: 'You need to Sign In',
          redirect_url: '/auth/sign_in'
        }
      end

      if @@manager_only && current_user&.nil?
        @permission_error = {
          errors: ['You are not authorized'],
          notification: 'You don\'t have permission',
          redirect_url: '/errors/not_authorized'
        }
      end

      if @@service_user_only && !current_user&.service_user
        @permission_error = {
          errors: ['You are not authorized'],
          notification: 'You don\'t have permission',
          redirect_url: '/errors/not_authorized'
        }
      end

      if @@authorize_lambda
        err = @@authorize_lambda&.call(**args, current_user: current_user, current_account: current_account, current_firm: current_firm)

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

    def ready?(**args)
      permit!(**args)

      return false, @permission_error if @permission_error

      true
    end
  end
end
