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
require 'phonelib'

class User < ApplicationRecord
  GRAPHQL_TYPE = Types::UsersRelated::UserType
  SIGN_IN_DELAY = 60

  # MODULES ===============================================================
  include AASM

  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  #
  # HAS_ONE ASSOCIATIONS ==================================================
  has_one :account, dependent: :destroy

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  #
  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  #
  # AASM STATES ===========================================================
  aasm column: :status do
    state :inactive, initial: true
    state :temporary
    state :active
    state :disabled

    event :inactive do
      transitions from: :temporary, to: :inactive
    end
  end

  # ENUMS =================================================================
  #
  # SECURE TOKEN ==========================================================
  #
  # SECURE PASSWORD =======================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # RICH_TEXT =============================================================
  #
  # VALIDATIONS ===========================================================
  validates :email, uniqueness: { allow_blank: true }
  validates :phone, uniqueness: { allow_blank: true }
  validates :phone, phone: { allow_blank: true }, unless: :skip_phone_validation
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, allow_blank: true }

  # CALLBACKS =============================================================
  before_validation :transform_email

  # SCOPES ================================================================
  #
  # DELEGATION ============================================================

  def self.create_temporary
    user = create(status: :temporary, session_password: SecureRandom.hex(50))
    Account.create!(user: user)

    user
  end

  def send_confirmation_code!(primary:)
    return if temporary?

    raise 'You are trying to resend confirmation code too often' unless can_send_code?

    code = rand.to_s[2..6]

    self.confirmation_code = code
    self.last_try = Time.zone.now

    save!

    if primary == 'email' && email
      Notification.create!(delivery_method: 'email',
                           to: email,
                           subject: 'Your confirmation code',
                           content: Stopover::MailProvider.prepare_content(file: 'mailer/auth/confirmation_code_sent',
                                                                           locals: { confirmation_code: confirmation_code }))
    elsif primary == 'phone' && phone
      Notification.create!(delivery_method: 'sms',
                           to: phone,
                           content: "Your confirmation code: ##{confirmation_code}")
    end
  end

  def activate!(code:)
    return if temporary?

    raise StandardError, I18n.t('graphql.mutations.sign_in.errors.confirmation_code_incorrect') if code != confirmation_code || confirmation_code.nil?

    if account
      account.update(name: account&.name || phone || email,
                     primary_phone: account.primary_phone || phone,
                     primary_email: account.primary_email || email,
                     phones: account.phones || [],
                     user: self)
    else
      self.account = Account.create(name: phone || email,
                                    primary_phone: phone,
                                    primary_email: email,
                                    phones: [],
                                    user: self)
    end

    self.confirmation_code = nil
    self.last_try = nil
    self.confirmed_at = Time.zone.now
    self.status = :active

    self.session_password = SecureRandom.hex(50)

    save!

    if email
      Notification.create!(
        to: email,
        subject: 'Your confirmation code',
        content: Stopover::MailProvider.prepare_content(file: 'mailer/auth/successfully_signed_in'),
        delivery_method: 'email'
      )
    elsif phone
      Notification.create!(
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

  def transform_email
    self.email = email&.downcase
  end

  def skip_phone_validation
    Flipper.enabled?(:skip_phone_validation)
  end

  def can_send_code?
    return true unless last_try || confirmation_code

    required_delay = SIGN_IN_DELAY
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
