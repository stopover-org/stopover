class RemoveUselessModels < ActiveRecord::Migration[7.0]
  def change
    remove_column :events, :unit_id
    drop_table :event_tags
    drop_table :event_achievements
    drop_table :units
    drop_table :achievements
    drop_table :tags
  end
end
