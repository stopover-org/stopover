# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    field :errors, [String], null: true
    field :notification, String, null: true
    field :redirect_url, String, null: true

    def self.manager_only
      @manager_only = true
      @service_user_only = true
      @authorized_only = true

      nil
    end

    def self.service_user_only
      @service_user_only = true
      @manager_only = false
      @authorized_only = true

      nil
    end

    def self.authorized_only
      @service_user_only = false
      @manager_only = false
      @authorized_only = true

      nil
    end

    def self.authorize(lambda)
      @authorize_lambda = lambda
    end

    def current_user
      context[:current_user]
    end

    def current_account
      current_user.account
    end

    delegate :current_firm, to: :current_account

    def permit!(**_args)
      if @@authorized_only && current_user.temporary?
        @permission_error = {
          error: { auth: 'You are not authorized' },
          message: 'You need to Sign In',
          redirect_url: '/auth/sign_in'
        }
      end

      if @@manager_only && current_firm.nil?
        @permission_error = {
          error: { auth: 'You are not authorized' },
          message: 'You don\'t have permission',
          redirect_url: '/errors/not_authorized'
        }
      end

      if @@service_user_only && !current_user.service_user
        @permission_error = {
          error: { auth: 'You are not authorized' },
          message: 'You don\'t have permission',
          redirect_url: '/errors/not_authorized'
        }
      end

      if @@authorize_lambda
        err = @@authorize_lambda.call(**args)

        @permission_error = {
          error: err,
          message: 'You don\'t have permission',
          redirect_url: '/errors/not_authorized'
        }
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
