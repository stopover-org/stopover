class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.string :delivery_method, null: false
      t.string :from
      t.string :to, null: false
      t.string :subject
      t.string :content, null: false
      t.timestamp :sent_at

      t.timestamps
    end
  end
end
