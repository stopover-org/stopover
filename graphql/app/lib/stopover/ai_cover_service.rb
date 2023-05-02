# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'

module Stopover
  class AiCoverService
    def initialize(query)
      @query = query
      @retry = 0
    end

    def fetch
      api_key =  Rails.application.credentials[:dallee_open_ai_key]
      return nil unless api_key
      return nil if @retry >= 15
      uri = URI.parse('https://api.openai.com/v1/images/generations')
      request = Net::HTTP::Post.new(uri)
      request.content_type = 'application/json'
      request['Authorization'] = "Bearer #{api_key}"
      request.body = JSON.dump({
                                 'prompt' => @query,
                                 'n' => 1,
                                 'size' => '1024x1024'
                               })

      req_options = {
        use_ssl: uri.scheme == 'https'
      }

      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end

      # rubocop:disable Style/OpenStructUse
      data = JSON.parse(response.body, object_class: OpenStruct).data
      # rubocop:enable Style/OpenStructUse

      should_retry = data.nil? || data.size&.zero?
      if should_retry
        @retry += 1
        Rails.logger.debug { "failed #{@retry} times" }
        Rails.logger.debug response.body.inspect

        sleep_time = 60 + rand(60 + 1)
        Rails.logger.debug { "sleep #{sleep_time}" }
        sleep sleep_time.seconds

        return fetch
      end

      url = data[0].url

      Rails.logger.debug url

      unless url
        @retry += 1
        Rails.logger.debug { "failed #{@retry} times" }
        Rails.logger.debug response.body.inspect

        sleep_time = 60 + rand(60 + 1)
        Rails.logger.debug { "sleep #{sleep_time}" }
        sleep sleep_time.seconds

        return fetch
      end

      url
    end

    def attach(record)
      return unless record.is_a?(Event)

      url = fetch

      return nil unless url

      record.images.attach(io: URI.parse(url).open, filename: SecureRandom.hex.to_s)
    end
  end
end
