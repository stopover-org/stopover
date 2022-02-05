class InternalServerError < BaseError
  def initialize(message = nil)
    if Rails.env.test? || Rails.env.development?
      super(message)
    else
      # In prod/staging, block error details
      super(nil)
    end
  end

  def default_message
    'Internal Server Error'
  end

  def http_status
    500
  end

  def fatal?
    true
  end
end
