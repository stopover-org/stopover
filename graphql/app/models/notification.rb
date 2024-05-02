# frozen_string_literal: true

# == Schema Information
#
# Table name: notifications
#
#  id                :bigint           not null, primary key
#  content           :string           not null
#  delivery_method   :string           not null
#  from              :string
#  notification_type :string           default("system")
#  sent_at           :datetime
#  subject           :string
#  to                :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  booking_id        :bigint
#  firm_id           :bigint
#
# Indexes
#
#  index_notifications_on_booking_id  (booking_id)
#  index_notifications_on_firm_id     (firm_id)
#
class Notification < ApplicationRecord
  # MODULES ===============================================================
  #
  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :booking, optional: true
  belongs_to :firm, optional: true

  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  #
  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  #
  # AASM STATES ===========================================================
  #
  # ENUMS =================================================================
  enum delivery_method: {
    email: 'email',
    sms: 'sms'
  }, _prefix: true

  enum notification_type: {
    custom: 'custom',
    system: 'system'
  }, _prefix: true

  # SECURE TOKEN ==========================================================
  #
  # SECURE PASSWORD =======================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # RICH_TEXT =============================================================
  #
  # VALIDATIONS ===========================================================
  validates :from, presence: true
  validates :to, presence: true
  validates :delivery_method, presence: true
  validates :notification_type, presence: true

  # CALLBACKS =============================================================
  before_validation :set_from
  before_validation :adjust_firm
  after_commit :trigger, unless: :sent_at

  # SCOPES ================================================================
  #
  # DELEGATION ============================================================

  def trigger
    service.deliver(from: from, to: to, content: content, subject: subject, type: 'text/html') unless Flipper.enabled?(:skip_notifications_delivery)
    sent_at = Time.zone.now

    update!(sent_at: sent_at)
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
    self.from = service::DEFAULT_SENDER if service && !from
  end

  def adjust_firm
    return unless booking
    self.firm = booking.firm unless firm
  end
end
