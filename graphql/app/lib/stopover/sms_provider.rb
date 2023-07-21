# frozen_string_literal: true

module Stopover
  class SmsProvider
    DEFAULT_SENDER = '+79829320283'
    # rubocop:disable Lint/UnusedMethodArgument
    def self.deliver(from:, to:, content:, subject: nil, type: nil)
      # rubocop:enable Lint/UnusedMethodArgument

      return if Rails.env.test?

      client = Twilio::REST::Client.new

      client.messages.create(
        from: from,
        to: to,
        body: content
      )
    end
  end
end
