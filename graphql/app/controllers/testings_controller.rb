# frozen_string_literal: true

require 'factory_bot'
require 'factory_bot_rails'

class TestingsController < ApplicationController
  def test_sign_in
    Stopover::FlagsSupport.skip_notifications(skip: true) do
      Stopover::FlagsSupport.disable_phone_validation(skip: true) do
        Rails.logger.info "Log in #{params[:email]}"

        user = User.find_or_create_by(email: params[:email])

        if user
          user.update!(confirmed_at: Time.zone.now, session_password: SecureRandom.hex(50), status: :active)

          return render json: Stopover::Testing::E2eHelper.user_data(user)
        end

        render json: nil
      end
    end
  rescue StandardError => e
    Rails.logger.warn e
    Rails.logger.warn params.to_unsafe_h

    render json: {}
  end

  def setup
    result = []
    setup_variables = params[:setup_variables]
    skip_delivery = params[:skip_delivery]
    Stopover::FlagsSupport.skip_notifications(skip: skip_delivery) do
      Stopover::FlagsSupport.skip_stripe_integrations(skip: true) do
        Stopover::FlagsSupport.disable_phone_validation(skip: true) do
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

            json[:account] = model_instance.account.to_json if model_instance.try(:account)

            json[:accounts] = model_instance.accounts.map { |account| Stopover::Testing::E2eHelper.account_data(account) } if model_instance.try(:accounts)

            json[:user] = Stopover::Testing::E2eHelper.user_data(model_instance.user) if model_instance.try(:user)

            json[:event] = Stopover::Testing::E2eHelper.event_data(model_instance.event) if model_instance.try(:event)

            json[:schedule] = model_instance.schedule.to_json if model_instance.try(:schedule)

            json[:seo_metadatum] = model_instance.seo_metadatum.to_json if model_instance.try(:seo_metadatum)

            json[:firm] = Stopover::Testing::E2eHelper.firm_data(model_instance.firm) if model_instance.try(:firm)

            json.to_json
          end

          render json: json
        end
      end
    end
  rescue StandardError => e
    Rails.logger.warn e
    Rails.logger.warn params.to_unsafe_h

    render json: {}
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
  rescue StandardError => e
    Rails.logger.warn e
    Rails.logger.warn params.to_unsafe_h

    render json: {}
  end
end
