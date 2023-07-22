namespace :deploy do
    desc 'Restart application'
    task :restart do
        on roles(:app) do
            execute "cd #{fetch(:deploy_to)}/current && sudo service nextjs restart"
        end
    end
end

after 'deploy:publishing', 'deploy:restart'
