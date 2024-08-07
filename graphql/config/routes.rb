# frozen_string_literal: true

# == Route Map
#
#                                   Prefix Verb   URI Pattern                                                                                       Controller#Action
#                           graphiql_rails        /graphiql                                                                                         GraphiQL::Rails::Engine {:graphql_path=>"/graphql"}
#                                  graphql POST   /graphql(.:format)                                                                                graphql#execute
#                             admin_events GET    /admin/events(.:format)                                                                           admin/events#index {:format=>:json}
#                                          POST   /admin/events(.:format)                                                                           admin/events#create {:format=>:json}
#                          new_admin_event GET    /admin/events/new(.:format)                                                                       admin/events#new {:format=>:json}
#                         edit_admin_event GET    /admin/events/:id/edit(.:format)                                                                  admin/events#edit {:format=>:json}
#                              admin_event GET    /admin/events/:id(.:format)                                                                       admin/events#show {:format=>:json}
#                                          PATCH  /admin/events/:id(.:format)                                                                       admin/events#update {:format=>:json}
#                                          PUT    /admin/events/:id(.:format)                                                                       admin/events#update {:format=>:json}
#                                          DELETE /admin/events/:id(.:format)                                                                       admin/events#destroy {:format=>:json}
#                          admin_interests GET    /admin/interests(.:format)                                                                        admin/interests#index {:format=>:json}
#                                          POST   /admin/interests(.:format)                                                                        admin/interests#create {:format=>:json}
#                       new_admin_interest GET    /admin/interests/new(.:format)                                                                    admin/interests#new {:format=>:json}
#                      edit_admin_interest GET    /admin/interests/:id/edit(.:format)                                                               admin/interests#edit {:format=>:json}
#                           admin_interest GET    /admin/interests/:id(.:format)                                                                    admin/interests#show {:format=>:json}
#                                          PATCH  /admin/interests/:id(.:format)                                                                    admin/interests#update {:format=>:json}
#                                          PUT    /admin/interests/:id(.:format)                                                                    admin/interests#update {:format=>:json}
#                                          DELETE /admin/interests/:id(.:format)                                                                    admin/interests#destroy {:format=>:json}
#         turbo_recede_historical_location GET    /recede_historical_location(.:format)                                                             turbo/native/navigation#recede
#         turbo_resume_historical_location GET    /resume_historical_location(.:format)                                                             turbo/native/navigation#resume
#        turbo_refresh_historical_location GET    /refresh_historical_location(.:format)                                                            turbo/native/navigation#refresh
#            rails_postmark_inbound_emails POST   /rails/action_mailbox/postmark/inbound_emails(.:format)                                           action_mailbox/ingresses/postmark/inbound_emails#create
#               rails_relay_inbound_emails POST   /rails/action_mailbox/relay/inbound_emails(.:format)                                              action_mailbox/ingresses/relay/inbound_emails#create
#            rails_sendgrid_inbound_emails POST   /rails/action_mailbox/sendgrid/inbound_emails(.:format)                                           action_mailbox/ingresses/sendgrid/inbound_emails#create
#      rails_mandrill_inbound_health_check GET    /rails/action_mailbox/mandrill/inbound_emails(.:format)                                           action_mailbox/ingresses/mandrill/inbound_emails#health_check
#            rails_mandrill_inbound_emails POST   /rails/action_mailbox/mandrill/inbound_emails(.:format)                                           action_mailbox/ingresses/mandrill/inbound_emails#create
#             rails_mailgun_inbound_emails POST   /rails/action_mailbox/mailgun/inbound_emails/mime(.:format)                                       action_mailbox/ingresses/mailgun/inbound_emails#create
#           rails_conductor_inbound_emails GET    /rails/conductor/action_mailbox/inbound_emails(.:format)                                          rails/conductor/action_mailbox/inbound_emails#index
#                                          POST   /rails/conductor/action_mailbox/inbound_emails(.:format)                                          rails/conductor/action_mailbox/inbound_emails#create
#        new_rails_conductor_inbound_email GET    /rails/conductor/action_mailbox/inbound_emails/new(.:format)                                      rails/conductor/action_mailbox/inbound_emails#new
#       edit_rails_conductor_inbound_email GET    /rails/conductor/action_mailbox/inbound_emails/:id/edit(.:format)                                 rails/conductor/action_mailbox/inbound_emails#edit
#            rails_conductor_inbound_email GET    /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                                      rails/conductor/action_mailbox/inbound_emails#show
#                                          PATCH  /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                                      rails/conductor/action_mailbox/inbound_emails#update
#                                          PUT    /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                                      rails/conductor/action_mailbox/inbound_emails#update
#                                          DELETE /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                                      rails/conductor/action_mailbox/inbound_emails#destroy
# new_rails_conductor_inbound_email_source GET    /rails/conductor/action_mailbox/inbound_emails/sources/new(.:format)                              rails/conductor/action_mailbox/inbound_emails/sources#new
#    rails_conductor_inbound_email_sources POST   /rails/conductor/action_mailbox/inbound_emails/sources(.:format)                                  rails/conductor/action_mailbox/inbound_emails/sources#create
#    rails_conductor_inbound_email_reroute POST   /rails/conductor/action_mailbox/:inbound_email_id/reroute(.:format)                               rails/conductor/action_mailbox/reroutes#create
# rails_conductor_inbound_email_incinerate POST   /rails/conductor/action_mailbox/:inbound_email_id/incinerate(.:format)                            rails/conductor/action_mailbox/incinerates#create
#                       rails_service_blob GET    /rails/active_storage/blobs/redirect/:signed_id/*filename(.:format)                               active_storage/blobs/redirect#show
#                 rails_service_blob_proxy GET    /rails/active_storage/blobs/proxy/:signed_id/*filename(.:format)                                  active_storage/blobs/proxy#show
#                                          GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                                        active_storage/blobs/redirect#show
#                rails_blob_representation GET    /rails/active_storage/representations/redirect/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations/redirect#show
#          rails_blob_representation_proxy GET    /rails/active_storage/representations/proxy/:signed_blob_id/:variation_key/*filename(.:format)    active_storage/representations/proxy#show
#                                          GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format)          active_storage/representations/redirect#show
#                       rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                                       active_storage/disk#show
#                update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                               active_storage/disk#update
#                     rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                                    active_storage/direct_uploads#create
#
# Routes for GraphiQL::Rails::Engine:
#        GET  /           graphiql/rails/editors#show

flipper_app = Flipper::UI.app do |builder|
  builder.use Rack::Auth::Basic do |username, password|
    username == Rails.application.credentials.flipper.username && password == Rails.application.credentials.flipper.password
  end
end

Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?
  mount flipper_app, at: '/flipper'
  mount ActionCable.server, at: '/cable'

  post '/graphql', to: 'graphql#execute'

  post '/webhooks', to: 'webhooks#create'
  post '/connect_webhooks', to: 'connect_webhooks#create'

  post :test_setup, to: 'testings#setup'
  post :test_teardown, to: 'testings#teardown'
  post :test_sign_in, to: 'testings#test_sign_in'
end
