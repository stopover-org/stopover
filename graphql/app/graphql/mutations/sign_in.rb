# frozen_string_literal: true

require 'phonelib'

module Mutations
  class SignIn < BaseMutation
    field :user, Types::UserType
    field :delay, Integer, null: true
    field :access_token, String, null: true

    argument :username, String, required: true
    argument :code, String, required: false
    argument :type, Types::SignInTypesEnum, required: true

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

        { user: user, access_token: user.access_token }
      else
        user.send_confirmation_code!(primary: type)

        { user: nil, delay: user.delay }
      end
    rescue StandardError => e
      raise GraphQL::ExecutionError, e.message
    end
  end
end
