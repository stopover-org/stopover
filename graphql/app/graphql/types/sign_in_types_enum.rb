# frozen_string_literal: true

module Types
  class SignInTypesEnum < Types::BaseEnum
    value 'phone', 'allowed to sign in with phone'
    value 'email', 'allowed to sign in with email'
  end
end
