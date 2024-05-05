# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :load_test_env
  after_action :unload_test_env

  def load_test_env
    Flipper.enable(:global_sandbox) if request.headers['X-Sandbox'] == 'true'
  end

  def unload_test_env
    Flipper.disable(:global_sandbox) if request.headers['X-Sandbox'] == 'true'
  end
end
