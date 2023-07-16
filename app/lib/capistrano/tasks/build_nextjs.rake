namespace :nextjs do
    desc 'build nextjs'
    task :build do
        within fetch(:npm_target_path, release_path) do
            on roles(:app) do
                execute "npm run build"
            end
        end
    end
end
