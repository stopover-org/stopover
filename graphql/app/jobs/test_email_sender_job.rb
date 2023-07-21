# frozen_string_literal: true

class TestEmailSenderJob < ApplicationJob
  def test_mail(to:)
    Stopover::MailProvider.new.deliver(from: Stopover::MailProvider::DEFAULT_SENDER,
                                       to: to,
                                       subject: 'Testing Email Sender',
                                       type: 'text/html',
                                       content: Stopover::MailProvider.new.prepare_content(file: 'mailer/test_mail',
                                                                                           locals: {}))
  end
end
