# ENV['OPENSEARCH_URL'] = Rails.application.credentials.opensearch_url || 'http://localhost:9200'

connection_hash = {
  hosts: [ Rails.application.credentials.opensearch_url || 'http://localhost:9200' ],
  reload_connections: true,
  adapter: :httpclient,
  retry_on_failure: 2,
  request_timeout: 60
}

OpenSearch::Client.new(connection_hash)
