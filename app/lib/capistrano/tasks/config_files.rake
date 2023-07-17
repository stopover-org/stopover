namespace :config_files do
    desc 'Upload linked files files inside app folder'
    task :upload do
        on roles(:app) do
            upload! StringIO.new(File.read('.env')), "#{shared_path}/.env"
        end
    end
end
