DeepL.configure do |config|
  config.auth_key = Rails.application.credentials.deepl_key unless Rails.env.test?
  config.host = 'https://api-free.deepl.com'
end