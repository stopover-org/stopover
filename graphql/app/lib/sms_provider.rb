class SmsProvider
  @client = Twilio::REST::Client.new

  def send_sms(to:, message:)
    @client.messages.create(
      from: Rails.application.credentials.twilio_phone_number,
      to: to,
      body: message
    )
  end
end