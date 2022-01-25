class Configuration < ApplicationRecord
  DEFAULT_VALUES = {}
  def self.get_value(key)
    return nil if DEFAULT_VALUES.keys.include?(key.to_sym)

    record = Configuration.find_by_key(key)
    return record if record

    default = DEFAULT_VALUES[key.to_sym]

    record = Configuration.create!(key: key, value: default[:value], description: default[:description])
    record
  end

  def self.set_value(key)
    return nil if DEFAULT_VALUES.keys.include?(key.to_sym)
    record = Configuration.find_by_key(key)
    return record if record

    record = Configuration.create!(key: key, value: default[:value], description: default[:description])
    return record
  end

  def self.update_default
    DEFAULT.each do |key, config|
      set_value(key)
    end
  end
end
