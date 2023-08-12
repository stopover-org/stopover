# frozen_string_literal: true

module Mutations
  module Auth
    class SignIn < BaseMutation
      field :user, Types::AccountRelated::UserType
      field :delay, Integer, null: true
      field :access_token, String, null: true

      argument :username, String, required: true
      argument :code, String, required: false
      argument :type, Types::AccountRelated::SignInTypesEnum, required: true
      argument :reset_code, Boolean, required: false

      def resolve(username:, type:, **args)
        type = type.downcase

        user = if context[:current_user].nil?
                 case type
                 when 'phone'
                   User.find_or_create_by(phone: phone(username))
                 when 'email'
                   User.find_or_create_by(email: username.downcase)
                 end
               else
                 context[:current_user]
               end

        if user.temporary?
          case type
          when 'phone'
            user.phone = phone(username)
          when 'email'
            user.email = username.downcase
          end
          user.status = :inactive
          user.save
        end

        return { user: nil, delay: user.delay, errors: user.errors.messages.values.flatten.uniq } if user.invalid?

        should_reset_code = args[:reset_code] || !user.confirmation_code

        if args[:code]
          user.activate!(code: args[:code], method: type)

          context[:current_user] = user.reload

          return { user: user, access_token: user.access_token, notification: 'You successfully signed in' }
        elsif should_reset_code
          user.send_confirmation_code!(method: type)
          message = if type == 'phone'
                      'SMS was sent'
                    else
                      "#{type.capitalize} was sent"
                    end

          return { user: nil, delay: user.delay, notification: message }
        end

        { user: nil, delay: user.delay }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        { user: nil, delay: user&.delay, errors: [e.message] }
      end

      private

      def phone(number)
        number.gsub(/[\s()\-]/, '').downcase
      end
    end
  end
end
