# frozen_string_literal: true

namespace :db do
  task :exec_sql, [:file] => :environment do |task, args|
    sql_content = File.read(args.file)
    puts args.file, task, sql_content
    ActiveRecord::Base.connection.execute(sql_content)
  end
end

Rake::Task['db:schema:load'].enhance do
  Rake::Task['db:exec_sql'].invoke('lib/tasks/event_stored_functions.sql')
end
