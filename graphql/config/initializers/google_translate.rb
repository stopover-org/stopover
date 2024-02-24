require "google/cloud/translate"
require "google/cloud/translate/v3"

Google::Cloud::Translate.configure do |config|
  config.credentials = Rails.application.credentials.google_translate_credentials_path
end
