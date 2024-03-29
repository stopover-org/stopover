# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'
require 'active_model/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Graphql
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    config.time_zone = 'Belgrade'
    I18n.available_locales = [:en, :ru]
    config.i18n.default_locale = :en
    # config.eager_load_paths << Rails.root.join("extras")

    config.api_only = true
    config.session_store :cookie_store, key: '_interslice_session'
    config.middleware.use config.session_store, config.session_options
    config.middleware.use ActionDispatch::Cookies

    load_tasks
    require 'action_cable/engine'
  end
end
