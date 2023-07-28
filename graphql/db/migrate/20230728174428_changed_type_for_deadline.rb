class ChangedTypeForDeadline < ActiveRecord::Migration[7.0]
  def up
    remove_column :booking_cancellation_options, :deadline
    change_column :booking_cancellation_options, :penalty_price_cents, :decimal
    add_column :booking_cancellation_options, :deadline, :string, null: false
  end

  def down
    remove_column :booking_cancellation_options, :deadline
    change_column :booking_cancellation_options, :penalty_price_cents, :integer
    add_column :booking_cancellation_options, :deadline, :datetime, null: false
  end
end
