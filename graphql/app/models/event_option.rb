# frozen_string_literal: true

# == Schema Information
#
# Table name: event_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  built_in              :boolean          default(FALSE)
#  description           :text
#  for_attendee          :boolean          default(FALSE)
#  language              :string           default("en")
#  organizer_price_cents :decimal(, )      default(0.0)
#  status                :string           default("available")
#  title                 :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  event_id              :bigint           not null
#
# Indexes
#
#  index_event_options_on_event_id  (event_id)
#
class EventOption < ApplicationRecord
  GRAPHQL_TYPE = Types::EventsRelated::EventOptionType
  TRANSLATABLE_FIELDS = %i[title description].freeze
  AVAILABLE_LANGUAGES = %i[en ru].freeze

  # MODULES ===============================================================
  include Mixins::Translatable
  include Mixins::OptionStatuses

  # MONETIZE ==============================================================
  monetize :attendee_price_cents
  monetize :organizer_price_cents

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :event

  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  has_one :firm, through: :event

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :booking_options, dependent: :nullify
  has_many :attendee_options, dependent: :nullify
  has_many :stripe_integrations, as: :stripeable, dependent: :destroy

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :attendees, through: :attendee_options
  has_many :bookings, through: :booking_options

  # AASM STATES ===========================================================
  #
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
  validates :organizer_price_cents,
            :attendee_price_cents,
            :title,
            :language,
            :status,
            presence: true

  # CALLBACKS =============================================================
  before_validation :adjust_prices
  after_commit :update_total
  after_commit :sync_stripe

  # SCOPES ================================================================
  default_scope { in_order_of(:status, %w[available not_available]).order(created_at: :desc) }

  # DELEGATION ============================================================

  def current_stripe_integration
    stripe_integrations.active
                       .last
  end

  private

  def sync_stripe
    StripeIntegratorSyncJob.perform_later('event_option', id)
  end

  def adjust_prices
    return if !organizer_price || !event
    self.attendee_price = (organizer_price * (1 + (event.firm.margin / 100.0))).round(
      2, BigDecimal::ROUND_UP
    )
  end

  def update_total
    booking_options.reload.each(&:adjust_prices!)

    attendee_options.reload.each do |attendee_option|
      attendee_option.adjust_prices!
    end
  end
end
