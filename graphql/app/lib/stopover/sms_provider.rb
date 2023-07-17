# frozen_string_literal: true

module Stopover
  class SmsProvider
    DEFAULT_SENDER = '+79829320283'
    def self.deliver(from:, to:, content:)
      return if Rails.env.test?

      client = Twilio::REST::Client.new

      client.messages.create(
        from: from,
        to: to,
        body: content
      )

      Time.zone.now
    end
  end
end
