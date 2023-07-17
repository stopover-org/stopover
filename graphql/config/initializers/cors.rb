# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000', 'stopover.app.dorokhovich.ru'
    resource '*',
             headers: :any,
             methods: %i[get post patch put],
             expose: ['X-Total-Count'],
             credentials: true
  end
end
