class GenerateStoredFunctionsForEvents < ActiveRecord::Migration[7.0]
  def change
    Rake::Task["db:exec_sql"].invoke("lib/tasks/event_stored_functions.sql")
  end
end
