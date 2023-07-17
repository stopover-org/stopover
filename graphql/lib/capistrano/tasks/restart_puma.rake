namespace :deploy do
    desc 'Restart application'
    task :restart do
        on roles(:app) do
            execute "cd #{fetch(:deploy_to)}/current && #{fetch(:rbenv_prefix)} bundle exec pumactl -P #{fetch(:deploy_to)}/current/tmp/pids/server.pid phased-restart"
        end
    end
end

after 'deploy:publishing', 'deploy:restart'
