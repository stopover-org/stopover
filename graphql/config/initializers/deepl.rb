DeepL.configure do |config|
  config.auth_key = Rails.application.credentials.deepl_key || ENV['DEEPL_AUTH_KEY']
  config.host = 'https://api-free.deepl.com'
end
