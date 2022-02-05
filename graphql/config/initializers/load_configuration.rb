# frozen_string_literal: true

Rails.configuration.after_initialize do
  ::Configuration.update_default if ActiveRecord::Base.connection.view_exists? 'configurations'
rescue ActiveRecord::NoDatabaseError
end
