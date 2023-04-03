class CreateSetupIntent < ActiveRecord::Migration[7.0]
  def change
    create_table :setup_intents do |t|
      t.string :status, default: 'pending'
      t.string :stripe_setup_id
      t.timestamps
    end
    add_reference :firms, :setup_intent, index: true, foreign_key: true
  end
end
