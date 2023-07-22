class CreateStripeConnects < ActiveRecord::Migration[7.0]
  def change
    create_table :stripe_connects do |t|
      t.belongs_to :firm, null: false
      t.string :status, null: false, default: 'pending'
      t.string :stripe_connect_id
      t.timestamp :activated_at

      t.timestamps
    end

    remove_column :firms, :stripe_connect_id, :bigint

    remove_column :log_events, :content, :text
    add_column :log_events, :content, :jsonb
  end
end
