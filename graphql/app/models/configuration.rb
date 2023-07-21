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
      description: 'enable creating strip products and prices'
    },
    GET_TRIP_WINDOW: {
      key: 'GET_TRIP_WINDOW',
      value: 14,
      description: 'window gap where booking will be added to the trip'
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
end
