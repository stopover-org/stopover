namespace :deploy do
    desc 'Restart application'
    task :restart do
        on roles(:app) do
            execute "#{fetch(:rbenv_prefix)} pumactl -P ~#{fetch(:deploy_to)}/current/tmp/pids/puma.pid phased-restart"
        end
    end
end

after 'deploy:publishing', 'deploy:restart'
