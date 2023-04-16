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
  validates :email, presence:   true, unless: :phone
  validates :email, uniqueness: true, unless: :phone
  validates :phone, presence:   true, unless: :email
  validates :phone, uniqueness: true, unless: :email

  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def send_confirmation_code!(primary:)
    raise 'You are trying to resend confirmation code too often' unless can_send_code?

    code = rand.to_s[2..6]

    self.confirmation_code = code
    self.last_try = Time.zone.now

    save!

    if primary == 'email' && email
      MailProvider.send_mail(from: ::Configuration.get_value(:NOTIFICATION_EMAIL).value,
                             to: email,
                             subject: 'Confirmation code',
                             content: MailProvider.prepare_content(file: 'mailer/confirmation_code',
                                                                   locals: { confirmation_code: confirmation_code }))
    elsif primary == 'phone' && phone
      # SmsProvider.send_sms(from: ::Configuration.get_value(:NOTIFICATION_PHONE).value,
      #                      to: phone,
      #                      message: "Your confirmation code: ##{confirmation_code}")
    end
  end

  def activate!(code:)
    raise StandardError, 'Confirmation code is incorrect' if code != confirmation_code || confirmation_code.nil?

    self.confirmation_code = nil
    self.last_try = Time.zone.now
    self.confirmed_at = Time.zone.now
    self.status = :active

    unless account
      self.account = Account.new(name: phone.presence || email,
                                 primary_phone: phone,
                                 phones: phone.present? ? [phone] : [],
                                 user: self)
    end

    self.session_password = SecureRandom.hex(50)
    save!
  end

  def delay
    actual_delay = ::Configuration.get_value(:SIGN_IN_DELAY).value.to_i - (Time.zone.now.to_i - (last_try&.to_i || 0))
    return actual_delay if actual_delay.positive?
    0
  end

  def access_token
    self.session_password ||= SecureRandom.hex(50)
    save!

    JWT.encode({ email: email, phone: phone, id: id }, session_password, AuthorizationSupport::JWT_ALGORITHM)
  end

  private

  def can_send_code?
    return true unless last_try || confirmation_code

    required_delay = ::Configuration.get_value(:SIGN_IN_DELAY)&.value.to_i
    required_delay <= Time.zone.now.to_i - last_try.to_i
  end
end
