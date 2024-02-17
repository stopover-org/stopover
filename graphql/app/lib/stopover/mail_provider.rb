# frozen_string_literal: true

require 'sendgrid-ruby'
include SendGrid

module Stopover
  class MailProvider
    DEFAULT_SENDER = 'no-reply@stopoverx.com'
    NOTIFICATION_EMAIL = 'mikhail@stopoverx.com'

    DEV_DOMAINS = %w[dorokhovich.ru stopoverx.com].freeze

    def self.prepare_content(file:, locals: {})
      ApplicationController.render(file, locals: locals, layout: 'layouts/mailer')
    end

    def self.deliver(from:, to:, subject:, content:, type: 'text/html')
      return if Rails.env.test?

      return if Rails.env.development? && DEV_DOMAINS.exclude?(to.split('@').last)

      personalization = Personalization.new
      personalization.add_bcc(SendGrid::Email.new(email: NOTIFICATION_EMAIL, name: 'Stopover Manager')) if to != NOTIFICATION_EMAIL
      personalization.add_to(SendGrid::Email.new(email: to))

      personalization.subject = subject

      content = SendGrid::Content.new(value: content, type: type)
      mail = SendGrid::Mail.new

      mail.add_personalization(personalization)
      mail.add_content(content)
      mail.from = SendGrid::Email.new(email: from, name: 'do not reply')

      sg = SendGrid::API.new(api_key: Rails.application.credentials.sendgrid_api_key)
      sg.client.mail._('send').post(request_body: mail.to_json)
    end
  end
end
