namespace :npm do
    desc 'build nextjs'
    task :build do
        on roles fetch(:npm_roles) do
            within release_path do
                on roles(:app) do
                    execute "cd #{release_path}; NODE_ENV=production /usr/bin/npm run generate"
                    execute "cd #{release_path}; NODE_ENV=production /usr/bin/npm run build"
                end
            end
        end
    end
end
