# frozen_string_literal: true

class BaseError < StandardError
  def initialize(message = nil)
    message ||= default_message if respond_to?(:default_message)
    super(message)
  end

  def fatal?
    false
  end
end
