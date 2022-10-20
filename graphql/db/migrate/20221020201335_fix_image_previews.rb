class FixImagePreviews < ActiveRecord::Migration[7.0]
  def change
    remove_column :achievements, :preview
    remove_column :interests, :preview
    remove_column :tags, :preview
    remove_column :units, :preview
  end
end
