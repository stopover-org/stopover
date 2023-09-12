class AdjustRefundRelatedMdoels < ActiveRecord::Migration[7.0]
  def change
    remove_column :booking_cancellation_options, :deadline
    add_column :booking_cancellation_options, :deadline, :integer, null: false
  end
end
