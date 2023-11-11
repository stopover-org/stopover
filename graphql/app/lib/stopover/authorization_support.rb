# frozen_string_literal: true

require 'jwt'

module Stopover
  class AuthorizationSupport
    JWT_ALGORITHM = 'HS256'
    COOKIE_KEY = 'access_token'
    AUTHORIZATION_HEADER = ' X-Authorization'

    def self.decode_user(headers:, cookies:)
      cookie_token = cookies.encrypted[COOKIE_KEY]
      header = headers[AUTHORIZATION_HEADER]
      return nil if !header && !cookie_token

      access_token = header.split[1] if header
      access_token ||= cookie_token if cookie_token
      return nil unless access_token

      decoded_token = JWT.decode(access_token, nil, false, { algorithm: JWT_ALGORITHM })
      return nil unless decoded_token

      user = User.find(decoded_token[0]['id'])
      return nil unless user.session_password

      verified_decoded_token = JWT.decode(access_token, user.session_password, true, { algorithm: JWT_ALGORITHM })
      return nil unless verified_decoded_token

      user
    end
  end
end
