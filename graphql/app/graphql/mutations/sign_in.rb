module Mutations
  class SignIn < BaseMutation
    field :user, Types::UserType
    field :delay, Integer, null: true
    field :access_token, String, null: true

    argument :username, String
    argument :code, String, required: false
    argument :type, Types::SignInTypesEnum

    def resolve(username:, type:, **args)
      type = type.downcase
      if type == 'phone'
        user = User.find_or_create_by!(phone: username)
      elsif type == 'email'
        user = User.find_or_create_by!(email: username)
      end

      if args[:code]
        user.activate!(code: args[:code])

        return { user: user, access_token: user.access_token }
      else
        user.send_confirmation_code!(primary: type)

        return { user: nil, delay: user.delay }
      end
    end
  end
end
