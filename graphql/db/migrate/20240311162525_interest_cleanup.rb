class InterestCleanup < ActiveRecord::Migration[7.0]
  def change
    remove_column :interests, :active
  end
end
