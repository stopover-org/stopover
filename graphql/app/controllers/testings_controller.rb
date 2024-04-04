# frozen_string_literal: true

require 'factory_bot'
require 'factory_bot_rails'

class TestingsController < ApplicationController
  def setup
    result = []
    setup_variables = params[:setup_variables]
    setup_variables.each do |model_variable|
      record = FactoryBot.create(model_variable[:factory].to_sym,
                                 **model_variable[:attributes].to_unsafe_h)
      result << record
    end

    json = result.map do |record|
      json = record.attributes
      json[:access_token] = record.access_token if record.is_a? User

      json[:graphql_id] = GraphqlSchema.id_from_object(record) if record.class.const_defined?(:GRAPHQL_TYPE)

      json.to_json
    end

    render json: json
  end

  def teardown
    Redis.new.lrange('testing:e2e:records', 0, -1).each do |record_hash|
      hash = JSON.parse(record_hash).deep_symbolize_keys
      model = hash[:model].camelize.constantize
      record = model.find_by(id: hash[:id].to_i)

      record&.destroy
      Redis.new.lrem('testing:e2e:records', 1, hash.deep_stringify_keys.to_json)
    end

    render json: {}
  end
end
