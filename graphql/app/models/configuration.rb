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
  validates :key, uniqueness: true, presence: true # rubocop:disable Rails/UniqueValidationWithoutIndex
  default_scope { order(key: :asc) }

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
    }
  }.freeze
  def self.get_value(key)
    return nil unless DEFAULT_VALUES.keys.include?(key.to_sym)

    record = find_by(key: key)
    return record if record

    default = DEFAULT_VALUES[key.to_sym]

    create!(key: key, value: default[:value], description: default[:description])
  end

  def self.set_value(key)
    return nil unless DEFAULT_VALUES.keys.include?(key.to_sym)

    record = find_by(key: key)
    return record if record

    default = DEFAULT_VALUES[key.to_sym]
    create!(key: key, value: default[:value], description: default[:description])
  end

  def self.update_default
    DEFAULT_VALUES.each do |key, _config|
      set_value(key)
    end
  end
end
