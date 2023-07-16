namespace :npm do
    desc 'build nextjs'
    task :build do
        on roles fetch(:npm_roles) do
            within release_path do
                on roles(:app) do
                    execute "NODE_OPTIONS=--max_old_space_size=768 NODE_ENV=production /usr/bin/npm --prefix #{release_path} install --only=production"
                    execute "NODE_OPTIONS=--max_old_space_size=768 NODE_ENV=production /usr/bin/npm --prefix #{release_path} install --only=development"
                    execute "NODE_OPTIONS=--max_old_space_size=768 NODE_ENV=production /usr/bin/npm --prefix #{release_path} i --save-dev @types/react-relay"
                    execute "NODE_OPTIONS=--max_old_space_size=768 NODE_ENV=production /usr/bin/npm --prefix #{release_path} run build"
                end
            end
        end
    end
end
