class AddFeaturedToEvent < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :featured, :boolean, default: false
  end
end
