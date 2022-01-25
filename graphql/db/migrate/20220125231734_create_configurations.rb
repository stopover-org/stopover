class CreateConfigurations < ActiveRecord::Migration[7.0]
  def change
    create_table :configurations do |t|
      t.string :value
      t.string :key
      t.string :description

      t.timestamps
    end
  end
end
