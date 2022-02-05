class CreateAchievements < ActiveRecord::Migration[7.0]
  def change
    create_table :achievements do |t|
      t.string :title, null: false, index: { unique: true }
      t.string :preview
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
