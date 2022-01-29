require 'sendgrid-ruby'
include SendGrid

class MailProvider
  def prepare_content(file:, locals:)
    ApplicationController.render(file, locals: locals)
  end

  def send_mail(from:, to:, subject:, content:, type: 'text/html')
    return if Rails.env.test?

    from = SendGrid::Email.new(email: from)
    to = SendGrid::Email.new(email: to)
    subject = subject
    content = SendGrid::Content.new(value: content, type: type)
    mail = SendGrid::Mail.new(from, subject, to, content)

    sg = SendGrid::API.new(api_key: Rails.application.credentials.sendgrid_api_key)
    sg.client.mail._('send').post(request_body: mail.to_json)
  end
end