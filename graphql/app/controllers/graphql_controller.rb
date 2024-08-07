# frozen_string_literal: true

require 'jwt'

class GraphqlController < ApplicationController
  include ActionController::Cookies

  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  before_action :authorize!
  before_action :load_test_env
  after_action :unload_test_env

  # Executes a GraphQL query.
  # @param [Hash] params - The input parameters for executing the query.
  # @option params [Hash] :variables - The variables to be passed to the query.
  # @option params [String] :query - The GraphQL query.
  # @option params [String] :operationName - The name of the operation within the GraphQL query.
  #
  # @return [void]
  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      current_user: @current_user || User.create_temporary,
      cookies: cookies
    }

    set_locale
    update_user_locale

    result = GraphqlSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    status_code = result&.dig('errors', 0, 'extensions', 'statusCode') || 200
    cookies.permanent[Stopover::AuthorizationSupport::COOKIE_KEY] = context[:current_user]&.access_token

    render json: result, status_code: status_code
  rescue StandardError => e
    Sentry.capture_exception(e) if Rails.env.production?
    return handle_error_in_development(e) if Rails.env.development?

    render json: { errors: [{ message: 'Something went wrong' }], data: {} }, status: :internal_server_error
  end

  private

  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} },
           status: :internal_server_error
  end

  def authorize!
    user = Stopover::AuthorizationSupport.decode_user(headers: request.headers, cookies: cookies)
    @current_user = user
  rescue StandardError => e
    Sentry.capture_exception(e) if Rails.env.production?
    cookies.delete Stopover::AuthorizationSupport::COOKIE_KEY if e.is_a?(JWT::DecodeError) || e.is_a?(JWT::VerificationError) || e.is_a?(ActiveRecord::RecordNotFound)
  end

  def set_locale
    I18n.locale = cookies['i18next'] if cookies['i18next']
  end

  def update_user_locale
    @current_user.account.update!(language: I18n.locale) if @current_user&.account && (@current_user.account.language != I18n.locale)
  end
end
