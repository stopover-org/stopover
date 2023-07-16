namespace :npm do
    desc 'build nextjs'
    task :build do
        on roles fetch(:npm_roles) do
            within release_path do
                on roles(:app) do
                    execute "echo #{release_path}"
                    execute :npm, 'run build'
                end
            end
        end
    end
end
