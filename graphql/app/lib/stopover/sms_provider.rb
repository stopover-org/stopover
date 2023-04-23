# frozen_string_literal: true

module Stopover
  class SmsProvider
    def self.send_sms(from:, to:, message:)
      return if Rails.env.test?

      client = Twilio::REST::Client.new

      client.messages.create(
        from: from,
        to: to,
        body: message
      )
    end
  end
end
