class CreateTourPlans < ActiveRecord::Migration[7.0]
  def change
    create_table :tour_plans do |t|
      t.references :firm
      t.references :event

      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
