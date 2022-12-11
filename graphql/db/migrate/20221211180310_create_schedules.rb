class CreateSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :schedules do |t|
      t.string :status, null: false, default: 'active'
      t.timestamp :scheduled_for, null: false
      t.references :event, null: false, foreign_key: true

      t.timestamps
    end
  end
end
