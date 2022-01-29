class Configuration < ApplicationRecord
  validates :key, uniqueness: true, presence: true
  default_scope { order(key: :asc) }

  DEFAULT_VALUES = {
    SIGN_IN_DELAY: {
      key: 'SIGN_IN_DELAY',
      value: 60,
      description: 'delay between sending confirmation code for sign in'
    },
    NOTIFICATION_EMAIL: {
      key: 'NOTIFICATION_EMAIL',
      value: "admin@dorokhovich.ru",
      description: 'email that should be used for sending email notifications, like sending confirmation code'
    },
    NOTIFICATION_PHONE: {
      key: 'NOTIFICATION_PHONE',
      value: "+17755264317",
      description: 'phone that should be used for sending sms notifications, like sending confirmation code'
    }
  }
  def self.get_value(key)
    return nil unless DEFAULT_VALUES.keys.include?(key.to_sym)

    record = find_by_key(key)
    return record if record

    default = DEFAULT_VALUES[key.to_sym]

    record = create!(key: key, value: default[:value], description: default[:description])
    record
  end

  def self.set_value(key)
    return nil unless DEFAULT_VALUES.keys.include?(key.to_sym)
    record = find_by_key(key)
    return record if record

    default = DEFAULT_VALUES[key.to_sym]
    record = create!(key: key, value: default[:value], description: default[:description])
    return record
  end

  def self.update_default
    DEFAULT_VALUES.each do |key, config|
      set_value(key)
    end
  end
end
