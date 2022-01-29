class TestEmailSenderJob < ApplicationJob
  def test_mail(to:)
    MailProvider.new.send_mail(from: 'mikhail2@dorokhovich.ru',
                               to: to,
                               subject: 'Testing Email Sender',
                               type: 'text/html',
                               content: MailProvider.new.prepare_content(file: 'mailer/test_mail',
                                                                         locals: {}
                               )
    )
  end
end