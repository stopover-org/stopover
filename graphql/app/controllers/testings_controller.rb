require 'factory_bot'
require 'factory_bot_rails'

class TestingsController < ApplicationController
  before_action :load_test_env
  after_action :unload_test_env

  def setup
    result = []
    setup_variables = params[:setup_variables]
    setup_variables.each do |model_variable|
      result << FactoryBot.create(model_variable[:factory].to_sym,
                                  **model_variable[:attributes].to_unsafe_h)
    end

    render json: result.map { |record| record.attributes.to_json }
  end

  def teardown
    conn = ActiveRecord::Base.connection
    tables = conn.execute("show tables").map { |r| r[0] }
    # keep schema_migrations table
    tables.delete "schema_migrations"
    # wipe all other tables
    tables.each { |t| conn.execute("TRUNCATE #{t}") }

    render json: {}
  end

  private

  def load_test_env
    $skip_phone_validation = true
  end

  def unload_test_env
    $skip_phone_validation = false
  end
end
