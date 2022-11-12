class CreateRatings < ActiveRecord::Migration[7.0]
  def change
    create_table :ratings do |t|
      t.integer :rating_value
      t.belongs_to :event
      t.belongs_to :account, optional: true

      t.timestamps
    end
  end
end
