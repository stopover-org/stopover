# frozen_string_literal: true

require 'factory_bot'
require 'factory_bot_rails'

class TestingsController < ApplicationController
  before_action :load_test_env
  after_action :unload_test_env

  def setup
    result = []
    setup_variables = params[:setup_variables]
    setup_variables.each do |model_variable|
      record = FactoryBot.create(model_variable[:factory].to_sym,
                                 **model_variable[:attributes].to_unsafe_h)

      result << record
      Redis.new.lpush('testing:e2e:records', { model: record.class.name.downcase,
                                               id: record.id }.to_json)
    end

    render json: result.map { |record| record.attributes.to_json }
    # rescue => e
    #   debugger
  end

  def teardown
    Redis.new.lrange('testing:e2e:records', 0, -1).each do |record_hash|
      hash = JSON.parse(record_hash).deep_symbolize_keys
      model = hash[:model].capitalize.constantize
      record = model.find_by(id: hash[:id].to_i)
      record&.destroy!
      Redis.new.lrem('testing:e2e:records', 1, hash.deep_stringify_keys)
    end

    render json: {}
    # rescue => e
    #   debugger
  end

  private

  def load_test_env
    Flipper.disable(:global_translations)
    Flipper.enable(:skip_phone_validation)
  end

  def unload_test_env
    Flipper.enable(:global_translations)
    Flipper.disable(:skip_phone_validation)
  end
end
