# frozen_string_literal: true

# == Schema Information
#
# Table name: firms
#
#  id                :bigint           not null, primary key
#  business_type     :string           default("individual"), not null
#  city              :string
#  contact_person    :string
#  contacts          :text
#  country           :string
#  description       :text
#  full_address      :string
#  house_number      :string
#  latitude          :float
#  longitude         :float
#  margin            :integer          default(0)
#  payment_types     :string           default([]), not null, is an Array
#  postal_code       :string
#  primary_email     :string
#  primary_phone     :string
#  ref_number        :string
#  region            :string
#  status            :string           default("pending")
#  street            :string
#  title             :string           not null
#  website           :string
#  stripe_account_id :string
#
# Indexes
#
#  index_firms_on_ref_number  (ref_number) UNIQUE
#
class Firm < ApplicationRecord
  GRAPHQL_TYPE = Types::FirmsRelated::FirmType

  # MODULES ===============================================================
  include AASM

  # MONETIZE ==============================================================

  # BELONGS_TO ASSOCIATIONS ===============================================

  # HAS_ONE ASSOCIATIONS ==================================================
  has_one :balance

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :account_firms,    dependent: :destroy
  has_many :events,           dependent: :destroy
  has_many :stripe_connects,  dependent: :nullify
  has_many :refunds,          dependent: :nullify
  has_many :payouts,          dependent: :nullify
  has_many :attendees,        dependent: :nullify
  has_many :attendee_options, dependent: :nullify

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :accounts,   through: :account_firms
  has_many :bookings,   through: :events
  has_many :schedules,  through: :events
  has_many :payments,   through: :balance

  # AASM STATES ===========================================================
  aasm column: :status do
    state :pending, initial: true
    state :active
    state :removed

    event :activate do
      transitions from: %i[pending removed], to: :active
    end
    event :remove, after_commit: :remove_callback do
      transitions from: %i[active pending], to: :removed
    end
  end

  # ENUMS =================================================================
  enum business_type: {
    individual: 'individual',
      company: 'company',
      non_profit: 'non_profit',
      # US only
      government_entity: 'government_entity'
  }

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================
  has_one_attached :image

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================
  validates :primary_email,
            presence: true,
            unless: :primary_phone
  validates :primary_phone,
            presence: true,
            unless: :primary_email
  validates :title,
            presence: true
  validates :account_firms,
            length: { minimum: 1 }
  validates :ref_number,
            uniqueness: true,
            allow_blank: true
  validates :city,
            presence: true
  validates :country,
            presence: true
  validates :country,
            inclusion: { in: ISO3166::Country.all.map(&:iso_short_name) }
  validates :primary_email,
            format: { with: URI::MailTo::EMAIL_REGEXP,
                      message: 'is invalid',
                      allow_blank: true }
  validates :primary_phone,
            phone: { message: 'is invalid',
                     allow_blank: true }

  # CALLBACKS =============================================================
  before_validation :transform_phone
  after_create :create_balance
  after_create :notify

  # SCOPES ================================================================
  default_scope { in_order_of(:status, %w[pending active removed]) }

  # DELEGATION ============================================================

  def current_stripe_connect
    stripe_connects.active.last
  end

  def create_balance
    self.balance = Balance.create!(firm: self)
  end

  def remove_callback
    RemoveFirmJob.perform_later(id)
  end

  def notify
    Notification.create!(
      delivery_method: 'email',
      to: primary_email,
      subject: 'Stopover firm',
      content: Stopover::MailProvider.prepare_content(
        file: 'mailer/auth/firm_related',
        locals: {
          title: title,
          text: "You've created firm"
        }
      )
    )
  end

  private

  def transform_phone
    self.primary_phone = primary_phone.gsub(/[\s()\-]/, '') if primary_phone
  end
end
