namespace :nextjs do
    desc 'build nextjs'
    task :build do
        on roles(:app) do
            execute "npm run build"
        end
    end
end
