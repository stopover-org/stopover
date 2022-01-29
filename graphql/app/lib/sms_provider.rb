class SmsProvider
  @client = Twilio::REST::Client.new

  def send_sms(from:, to:, message:)
    return if Rails.env.test?
    @client = Twilio::REST::Client.new unless @client

    @client.messages.create(
      from: from,
      to: to,
      body: message
    )
  end
end