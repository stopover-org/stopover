# frozen_string_literal: true

class AddColumnsToEvent < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :external_id, :string, default: nil
    add_index :events, :external_id
    add_column :events, :landmark, :string, default: nil
    add_column :events, :prepaid_type, :string, default: nil
    add_column :events, :prepaid_amount_cents, :decimal, default: 0, null: false
    add_column :events, :requires_prepaid, :boolean, default: false, null: false
  end
end
