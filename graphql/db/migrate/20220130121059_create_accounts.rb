class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :house_number
      t.string :street
      t.string :city
      t.string :country
      t.string :region
      t.string :full_address
      t.float :longitude
      t.float :latitude
      t.string :status, default: 'initial', null: false

      t.string :phones, array: true, :default => []
      t.string :primary_phone

      t.belongs_to :user, index: { unique: true }, foreign: true

      t.timestamp :verified_at

      t.timestamps
    end
  end
end
