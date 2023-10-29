ENV['OPENSEARCH_URL'] = Rails.application.credentials.opensearch_url || 'http://localhost:9200'

if Rails.env.production?
  Searchkick.aws_credentials = {
    access_key_id: Rails.application.credentials.dig(:aws, :access_key_id),
    secret_access_key: Rails.application.credentials.dig(:aws, :secret_access_key),
    region: 'eu-central-1'
  }
end
