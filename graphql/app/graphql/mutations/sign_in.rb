module Mutations
  class SignIn < BaseMutation
    field :user, Types::UserType
    field :seconds_delay, Integer, null: false

    argument :username, String
    argument :code, String, required: false
    argument :type, Types::SignInTypesEnum

    def resolve(username:, type:, **args)
      second_try_delay = 60

      type = type.downcase
      if type == 'phone'
        user = User.where(phone: username).last
      elsif type == 'email'
        user = User.where(email: username).last
      end
      delay = second_try_delay - (DateTime.now.to_i - user&.last_try&.to_i)

      if user && user.confirmation_code && args[:code] && user.confirmation_code === args[:code]
        user.activate!

        return { user: user, seconds_delay: 0 }
      elsif user.confirmation_code.nil?
        user.send_confirmation_code!

        return { user: nil, seconds_delay: second_try_delay }
      elsif args[:code] && user.confirmation_code != args[:code]
        raise GraphQL::ExecutionError, "Code is incorrect, try again"
      end

      if user &&  delay > 0
        second_try_delay = delay
      elsif user
        user.send_confirmation_code!
      else
        if type == 'phone'
          user = User.new(phone: username)
          user.send_confirmation_code!
        elsif type == 'email'
          user = User.new(email: username)
          user.send_confirmation_code!
        end
      end

      return { user: nil, seconds_delay: second_try_delay }
    end
  end
end
