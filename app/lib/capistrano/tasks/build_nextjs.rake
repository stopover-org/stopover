namespace :nextjs do
    desc 'install packages'
    task :install do
        on roles(:app) do
            execute "npm install"
        end
    end

    desc 'build nextjs'
    task :build do
        on roles(:app) do
            execute "npm run build"
        end
    end
end
