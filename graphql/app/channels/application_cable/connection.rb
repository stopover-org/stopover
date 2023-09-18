# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = authorize!
    end

    private

    def authorize!
      Stopover::AuthorizationSupport.decode_user(headers: request.headers, cookies: cookies)
    rescue StandardError => e
      Sentry.capture_exception(e) if Rails.env.production?
      cookies.delete Stopover::AuthorizationSupport::COOKIE_KEY if e.is_a?(JWT::VerificationError) || e.is_a?(ActiveRecord::RecordNotFound)
      raise e unless Rails.env.development?

      handle_error_in_development(e)
    end
  end
end
