namespace :npm do
    desc 'build nextjs'
    task :build do
        on roles fetch(:npm_roles) do
            within release_path do
                on roles(:app) do
                    execute "NODE_ENV=production /usr/bin/npm --prefix #{release_path} run build"
                end
            end
        end
    end
end
