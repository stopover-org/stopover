DeepL.configure do |config|
  config.auth_key = Rails.application.credentials.deepl_key || ''
  config.host = 'https://api-free.deepl.com'
end