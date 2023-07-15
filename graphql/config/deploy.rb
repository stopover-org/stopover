# config valid for current version and patch releases of Capistrano
lock "~> 3.17.3"

set :application, "stopover"
set :repo_url, "git@github.com:stopover-org/stopover.git"
set :repo_tree, "graphql"
set :rails_env, :production

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp
set :branch, 'feature/staging'

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", 'config/master.key'
set :linked_files, %w[config/application.yml config/database.yml config/master.key]

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "tmp/webpacker", "public/system", "vendor", "storage"
set :linked_dirs, %w[log tmp/pids tmp/cache tmp/sockets vendor/bundle .bundle public/system public/uploads node_modules]

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

# # Skip migration if files in db/migrate were not modified
# # Defaults to false
set :conditionally_migrate, true

# RBENV SETUP
set :rbenv_type, :user # or :system, or :fullstaq (for Fullstaq Ruby), depends on your rbenv setup
set :rbenv_ruby, File.read('.ruby-version').strip

# ================================================
# ============ From Custom Rake Tasks ============
# ================================================
# ===== See Inside: lib/capistrano/tasks =========
# ================================================

# upload configuration files
before 'deploy:starting', 'config_files:upload'
set :initial, true

# run only if app is being deployed for the very first time, should update "set :initial, true" above to run this
before 'deploy:migrate', 'database:create' if fetch(:initial)

# reload application after successful deploy
after 'deploy:publishing', 'application:reload'
