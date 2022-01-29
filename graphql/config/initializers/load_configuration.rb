Rails.configuration.after_initialize do
  ::Configuration.update_default
end