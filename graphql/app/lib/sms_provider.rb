class SmsProvider
  @client = Twilio::REST::Client.new

  def send_sms(from:, to:, message:)
    @client.messages.create(
      from: from,
      to: to,
      body: message
    )
  end
end