# namespace :deploy do
#   desc 'Restart application'
#   task :restart do
#     on roles(:app) do
#       if File.exist? "#{fetch(:deploy_to)}/current/tmp/pids/tmp.pid"
#         execute :sudo, 'systemctl stop puma'
#         execute :sudo, 'systemctl start puma'
#       else
#         execute :sudo, 'systemctl start puma'
#       end
#     end
#   end
# end
#
# after 'deploy:publishing', 'deploy:restart'
