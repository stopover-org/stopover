# frozen_string_literal: true

require 'jwt'

class GraphqlController < ApplicationController
  include ActionController::Cookies

  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  before_action :authorize!

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      current_user: @current_user || nil,
      cookies: cookies
    }
    set_locale
    update_user_locale
    result = GraphqlSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    status_code = result&.dig('errors', 0, 'extensions', 'statusCode') || 200
    cookies.encrypted[Stopover::AuthorizationSupport::COOKIE_KEY] = context[:current_user]&.access_token

    render json: result, status_code: status_code
  rescue StandardError => e
    Sentry.capture_exception(e) if Rails.env.production?
    return handle_error_in_development(e) if Rails.env.development?

    render json: { errors: [{ message: 'Something went wrong' }], data: {} }, status: :internal_server_error
  end

  private

  # Handle variables in form data, JSON body, or a blank value
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

  def skip_authorization?
    true
    # return [:sign_in, :introspection_query].include?(params[:operationName].underscore.to_sym)
  end

  def authorize!
    user = Stopover::AuthorizationSupport.decode_user(headers: request.headers, cookies: cookies)
    @current_user = user
  rescue StandardError => e
    Sentry.capture_exception(e) if Rails.env.production?
    cookies.delete Stopover::AuthorizationSupport::COOKIE_KEY if e.is_a?(JWT::VerificationError) || e.is_a?(ActiveRecord::RecordNotFound)
    raise e unless Rails.env.development?

    handle_error_in_development(e)
  end

  def set_locale
    I18n.locale = cookies['i18next'] if cookies['i18next']
  end

  def update_user_locale
    @current_user.account.update!(language: I18n.locale) if @current_user&.account && (@current_user.account.language != I18n.locale)
  end
end
