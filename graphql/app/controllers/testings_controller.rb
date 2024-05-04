# frozen_string_literal: true

require 'factory_bot'
require 'factory_bot_rails'

class TestingsController < ApplicationController
  def test_sign_in
    Stopover::FlagsSupport.skip_notifications(skip: true) do
      Rails.logger.info "Log in #{params[:email]}"

      user = User.find_or_create_by(email: params[:email])

      if user
        user.update!(confirmed_at: Time.zone.now, session_password: SecureRandom.hex(50), status: :active)

        return render json: Stopover::Testing::E2eHelper.user_data(user)
      end
    end

    render json: nil
  end

  def setup
    result = []
    setup_variables = params[:setup_variables]
    skip_delivery = params[:skip_delivery]
    Stopover::FlagsSupport.skip_notifications(skip: skip_delivery) do
      setup_variables.each do |model_variable|
        attributes = model_variable[:attributes]&.to_unsafe_h || {}
        record = FactoryBot.create(model_variable[:factory].to_sym,
                                   **attributes)
        result << record
      end

      json = result.map do |model_instance|
        json = model_instance.attributes
        json[:access_token] = model_instance.access_token if model_instance.is_a? User

        json[:graphql_id] = GraphqlSchema.id_from_object(model_instance) if model_instance.class.const_defined?(:GRAPHQL_TYPE)

        json[:account] = model_instance.account.to_json if model_instance&.account

        json[:user] = model_instance.user.to_json if model_instance&.user

        json[:event] = model_instance.event.to_json if model_instance&.event

        json[:schedule] = model_instance.schedule.to_json if model_instance&.schedule

        json.to_json
      end

      render json: json
    end
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
