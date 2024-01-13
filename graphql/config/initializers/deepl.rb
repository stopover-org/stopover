DeepL.configure do |config|
  if Rails.env.test?
    config.auth_key = 'tmp-key'
  else
    config.auth_key = Rails.application.credentials.deepl_key || ENV['DEEPL_AUTH_KEY']
  end
  config.host = 'https://api-free.deepl.com'
end
