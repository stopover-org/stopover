# frozen_string_literal: true

# == Schema Information
#
# Table name: notifications
#
#  id              :bigint           not null, primary key
#  content         :string           not null
#  delivery_method :string           not null
#  from            :string
#  sent_at         :datetime
#  subject         :string
#  to              :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Notification < ApplicationRecord
  before_validation :set_from
  after_commit :trigger

  enum delivery_method: {
    email: 'email',
      sms: 'sms'
  }, prefix: true

  def trigger
    sent_at = service.deliver(from: from, to: to, content: content, subject: subject, type: 'text/html')
    update(sent_at: sent_at)
  end

  private

  def service
    if delivery_method_email?
      Stopover::MailProvider
    elsif delivery_method_sms?
      Stopover::SmsProvider
    end
  end

  def set_from
    from = service::DEFAULT_SENDER
  end
end
