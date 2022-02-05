require 'jwt'

class GraphqlController < ApplicationController
  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  # protect_from_forgery with: :null_session
  before_action :authorize!

  JWT_ALGORITHM = 'HS256'

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      current_user: @current_user || nil,
    }
    response.headers['Authorization'] = "Bearer #{@current_user.access_token}" if @current_user
    result = GraphqlSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    status_code = result&.dig('errors', 0, 'extensions', 'statusCode') || 200

    render json: result, status_code: status_code
  rescue => e
    handle_error_in_development(e) if Rails.env.development?
    render json: { errors: [{ message: 'Something went wrong' }], data: {} }, status: 500
  end

  def relay_id
    klass = params[:type_name].classify.constantize
    object = klass.find(params[:raw_id])
    id = GraphqlSchema.id_from_object(object)
    render json: { id: id }
  end

  def raw_id
    id = GraphqlSchema.object_from_id(params[:relay_id]).try(:id)
    render json: { raw_id: id }
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

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: 500
  end

  def skip_authorization?
    return true
    # return [:sign_in, :introspection_query].include?(params[:operationName].underscore.to_sym)
  end

  def authorize!
    user = AuthorizationSupport.decode_user(headers: request.headers)
    @current_user = user
  rescue => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end
end
