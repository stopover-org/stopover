# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                :bigint           not null, primary key
#  confirmation_code :string
#  confirmed_at      :datetime
#  disabled_at       :datetime
#  email             :string
#  last_try          :datetime
#  phone             :string
#  service_user      :boolean          default(FALSE)
#  session_password  :string
#  status            :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#  index_users_on_phone  (phone) UNIQUE
#
require 'jwt'

class User < ApplicationRecord
  SIGN_IN_DELAY = 60
  # MODULES ===============================================================
  include AASM

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  has_one :account, dependent: :destroy

  # HAS_MANY ASSOCIATIONS =========================================================
  #
  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  #
  # AASM STATES ================================================================
  aasm column: :status do
    state :inactive, initial: true
    state :temporary
    state :active
    state :disabled
  end

  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  validates :email, format: { with: /\A(.+)@(.+)\z/, message: 'is invalid' },
            uniqueness: { case_sensitive: false },
            length: { minimum: 4, maximum: 254 },
            allow_blank: true
  validates :phone,
            uniqueness: { case_sensitive: false },
            phone: { allow_blank: true, possible: true },
            allow_blank: true

  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def send_confirmation_code!(method:)
    return if temporary?

    raise 'You are trying to resend confirmation code too often' unless can_send_code?

    code = rand.to_s[2..6]

    self.confirmation_code = code
    self.last_try = Time.zone.now

    save!

    if method == 'email' && email
      Notification.create!(
        origin_key: Notification::ORIGIN_KEYS[:confirmation_code_sent],
        delivery_method: 'email',
        to: email,
        subject: 'Your confirmation code',
        content: Stopover::MailProvider.prepare_content(file: 'mailer/auth/confirmation_code_sent',
                                                        locals: { confirmation_code: confirmation_code })
      )
    elsif method == 'phone' && phone
      Notification.create!(
        origin_key: Notification::ORIGIN_KEYS[:confirmation_code_sent],
        delivery_method: 'sms',
        to: phone,
        content: "Your confirmation code: ##{confirmation_code}"
      )
    end
  end

  def activate!(code:, method:)
    return if temporary?

    raise StandardError, 'Confirmation code is incorrect' if code != confirmation_code || confirmation_code.nil?

    self.confirmation_code = nil
    self.last_try = Time.zone.now
    self.confirmed_at = Time.zone.now
    self.status = :active

    unless account
      account = Account.new
      account.assign_attributes(name: phone || email,
                                primary_notification_method: method,
                                phones: phone.present? ? [phone] : [],
                                user: self)
      account.save!
    end

    self.session_password = SecureRandom.hex(50)

    save!

    if method == 'email' && email
      Notification.create!(
        origin_key: Notification::ORIGIN_KEYS[:signed_in],
        to: email,
        subject: 'Your confirmation code',
        content: Stopover::MailProvider.prepare_content(file: 'mailer/auth/successfully_signed_in'),
        delivery_method: 'email'
      )
    end

    if method == 'phone' && phone
      Notification.create!(
        origin_key: Notification::ORIGIN_KEYS[:signed_in],
        to: phone,
        content: 'You successfully signed in',
        delivery_method: 'sms'
      )
    end
  end

  def delay
    return if temporary?

    actual_delay = SIGN_IN_DELAY - (Time.zone.now.to_i - (last_try&.to_i || 0))
    return actual_delay if actual_delay.positive?
    0
  end

  def access_token
    self.session_password ||= SecureRandom.hex(50)
    save!

    JWT.encode({ email: email, phone: phone, id: id }, session_password, Stopover::AuthorizationSupport::JWT_ALGORITHM)
  end

  private

  def can_send_code?
    return true unless last_try || confirmation_code

    required_delay = ::Configuration.get_value(:SIGN_IN_DELAY)&.value.to_i
    required_delay <= Time.zone.now.to_i - last_try.to_i
  end

  def should_have_email?
    return false if temporary?
    return true unless phone
    false
  end

  def should_have_phone?
    return false if temporary?
    return true unless email
    false
  end
end
