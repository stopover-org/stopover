# frozen_string_literal: true

# == Schema Information
#
# Table name: configurations
#
#  id          :bigint           not null, primary key
#  description :string
#  key         :string
#  value       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_configurations_on_key  (key)
#
class Configuration < ApplicationRecord
  # MODULES ===============================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  #
  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  #
  # AASM STATES ================================================================
  #
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  validates :key, uniqueness: true, presence: true # rubocop:disable Rails/UniqueValidationWithoutIndex

  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  default_scope { order(key: :asc) }

  # DELEGATIONS ==============================================================

  DEFAULT_VALUES = {
    SIGN_IN_DELAY: {
      key: 'SIGN_IN_DELAY',
      value: 60,
      description: 'delay between sending confirmation code for sign in'
    },
    NOTIFICATION_EMAIL: {
      key: 'NOTIFICATION_EMAIL',
      value: 'admin@dorokhovich.ru',
      description: 'email that should be used for sending email notifications, like sending confirmation code'
    },
    NOTIFICATION_PHONE: {
      key: 'NOTIFICATION_PHONE',
      value: '+17755264317',
      description: 'phone that should be used for sending sms notifications, like sending confirmation code'
    },
    GEOCODE_PROVIDER: {
      key: 'GEOCODE_PROVIDER',
      value: 'osm',
      description: 'which one maps provider will be used. supports only osm.'
    },
    EVENT_MARGIN: {
      key: 'EVENT_MARGIN',
      value: 10,
      description: 'payment to the holder of the website'
    },
    SCHEDULE_DAYS_IN_ADVANCE: {
      key: 'SCHEDULE_DAYS_IN_ADVANCE',
      value: Rails.env.test? ? 28 : 365,
      description: 'how many days in advance can be scheduled for events'
    },
    ENABLE_STRIPE_INTEGRATION: {
      key: 'ENABLE_STRIPE_INTEGRATION',
      value: Rails.env.test? ? 'false' : 'true',
      description: '???'
    }
  }.freeze
  def self.get_value(key)
    return nil unless DEFAULT_VALUES.keys.include?(key.to_sym)

    record = find_by(key: key)
    return record if record

    default = DEFAULT_VALUES[key.to_sym]

    create!(key: key, value: default[:value], description: default[:description])
  end

  def self.set_value(key, value = nil)
    return nil unless DEFAULT_VALUES.keys.include?(key.to_sym)

    record = get_value(key)
    record.value = value || default[:value]
    record.save!

    return record if record

    default = DEFAULT_VALUES[key.to_sym]
    create!(key: key, value: value || default[:value], description: default[:description])
  end

  def self.update_default
    DEFAULT_VALUES.each do |key, _config|
      set_value(key)
    end
  end

  def self.generate_stripe_checkout_session(booking, payment_type)
    event_stripe_integration = booking.event.stripe_integrations.where(price_type: payment_type).first

    event_options = booking.event_options
    # TODO: add attendee options to checkout

    payment = Payment.create!(booking: booking)
    checkout = Stripe::Checkout::Session.create({
                                                  line_items: [{
                                                    price: event_stripe_integration.price_id,
                                                                 quantity: booking.attendees.count
                                                  },
                                                               *event_options.map do |opt|
                                                                 {
                                                                   price: opt.stripe_integration.price_id,
                                                                   quantity: 1
                                                                 }
                                                               end],
                                                  mode: 'payment',
                                                  success_url: "http://localhost:3000/checkouts/success/#{GraphqlSchema.id_from_object(payment)}",
                                                  cancel_url: "http://localhost:3000/checkouts/cancel/#{GraphqlSchema.id_from_object(payment)}",
                                                  expires_at: 300_000
                                                })
    payment.stripe_checkout_session_id = checkout[:id]
    payment.process!

    {
      url: checkout[:url],
      payment: payment
    }
  rescue StandardError => e
    {
      url: nil,
      payment: payment
    }
  end
end
