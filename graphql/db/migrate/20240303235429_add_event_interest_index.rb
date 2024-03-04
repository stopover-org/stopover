class AddEventInterestIndex < ActiveRecord::Migration[7.0]
  def change
    add_index :event_interests, %i[event_id interest_id], unique: true
  end
end
