# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :load_test_env
  after_action :unload_test_env

  def load_test_env
    if request.headers['X-Sandbox'] == 'true'
      Flipper.enable(:global_sandbox)
      Flipper.enable(:skip_phone_validation)
    end
  end

  def unload_test_env
    if request.headers['X-Sandbox'] == 'true'
      Flipper.disable(:global_sandbox)
      Flipper.disable(:skip_phone_validation)
    end
  end
end
