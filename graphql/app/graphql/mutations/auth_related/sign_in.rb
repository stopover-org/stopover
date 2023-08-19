# frozen_string_literal: true

require 'phonelib'

module Mutations
  module AuthRelated
    class SignIn < BaseMutation
      field :user, Types::UsersRelated::UserType
      field :delay, Integer, null: true
      field :access_token, String, null: true
      field :reason, String, null: true

      argument :username, String, required: true
      argument :code, String, required: false
      argument :type, Types::UsersRelated::SignInTypesEnum, required: true
      argument :reset_code, Boolean, required: false

      def resolve(username:, type:, **args)
        type = type.downcase

        case type
        when 'phone'
          raise 'Phone is invalid' unless Phonelib.valid? username

          user = User.find_or_create_by!(phone: username)
        when 'email'
          user = User.find_or_create_by!(email: username)
        end

        if args[:code]
          user.activate!(code: args[:code])

          context[:current_user] = user.reload

          return { user: user, access_token: user.access_token, notification: 'You successfully signed in' }
        elsif args[:reset_code] || !user.confirmation_code
          user.send_confirmation_code!(primary: type)

          return { user: nil, delay: user.delay, notification: 'Confirmation code was sent' }
        end

        { user: nil, delay: user.delay, notification: 'Confirmation code was sent' }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        { user: nil, delay: user&.delay, errors: [e.message] }
      end
    end
  end
end
