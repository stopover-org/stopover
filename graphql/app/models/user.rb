# frozen_string_literal: true

require 'jwt'

class User < ApplicationRecord
  include AASM

  validates :email, presence: true unless :phone
  validates :phone, presence: true unless :email

  has_one :account, dependent: :destroy

  default_scope { where(status: %i[active inactive]) }

  aasm column: :status do
    state :inactive, initial: true
    state :active
    state :disabled
  end

  def send_confirmation_code!(primary:)
    raise 'You are trying to resend confirmation code too often' unless can_check_code?

    code = rand.to_s[2..6]

    self.confirmation_code = code
    self.last_try = DateTime.now

    save!

    if primary == 'email' && email
      MailProvider.send_mail(from: ::Configuration.get_value(:NOTIFICATION_EMAIL).value,
                             to: email,
                             subject: 'Confirmation code',
                             content: MailProvider.prepare_content(file: 'mailer/confirmation_code',
                                                                   locals: { confirmation_code: confirmation_code }))
    elsif primary == 'phone' && phone
      SmsProvider.send_sms(from: ::Configuration.get_value(:NOTIFICATION_PHONE).value,
                           to: phone,
                           message: "Your confirmation code: ##{confirmation_code}")
    end
  end

  def activate!(code:)
    raise 'Confirmation code is incorrect' if code != confirmation_code

    self.confirmation_code = nil
    self.last_try = DateTime.now
    self.confirmed_at = DateTime.now
    self.status = :active

    self.account = Account.new(primary_phone: phone, phones: phone.present? ? [phone] : [])

    self.session_password = SecureRandom.hex(50)
    save!
  end

  def delay
    ::Configuration.get_value(:SIGN_IN_DELAY).value.to_i - (DateTime.now.to_i - last_try&.to_i)
  end

  def access_token
    self.session_password ||= SecureRandom.hex(50)
    save!

    JWT.encode({ email: email, phone: phone, id: id }, session_password, AuthorizationSupport::JWT_ALGORITHM)
  end

  private

  def can_check_code?
    return true unless last_try || confirmation_code

    required_delay = ::Configuration.get_value(:SIGN_IN_DELAY)&.value.to_i
    required_delay <= DateTime.now.to_i - last_try.to_i
  end
end
