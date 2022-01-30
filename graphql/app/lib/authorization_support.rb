require 'jwt'

class AuthorizationSupport
  JWT_ALGORITHM = 'HS256'

  def self.decode_user(headers:)
    header = headers['Authorization']
    return nil unless header
    access_token = header.split(' ')[1]
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