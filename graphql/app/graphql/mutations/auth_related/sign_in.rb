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
        username = username.downcase

        case type
        when 'phone'
          if current_user
            existing_user = User.find_by(phone: username.gsub(/[\s()\-]/, ''))
            user = existing_user || current_user
            user.update!(phone: username.gsub(/[\s()\-]/, ''))
          else
            user = User.find_or_create_by!(phone: username.gsub(/[\s()\-]/, ''))
          end
        when 'email'
          if current_user
            existing_user = User.find_by(email: username.downcase)
            user = existing_user || current_user
            user.update!(email: username)
          else
            user = User.find_or_create_by!(email: username)
          end
        end

        user.inactive! if user.temporary?

        if args[:code]
          user.activate!(code: args[:code])

          context[:current_user] = user.reload

          return { user: user, access_token: user.access_token, notification: I18n.t('graphql.mutations.sign_in.notifications.success') }
        elsif args[:reset_code] || !user.confirmation_code
          user.send_confirmation_code!(primary: type)

          return { user: nil, delay: user.delay, notification: I18n.t('graphql.mutations.sign_in.notifications.confirmation_code_sent') }
        end

        { user: nil, delay: user.delay }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        { user: nil, delay: user&.delay, errors: [e.message] }
      end
    end
  end
end
