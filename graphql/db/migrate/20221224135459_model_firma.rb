class ModelFirma < ActiveRecord::Migration[7.0]
  def change
    create_table :firms do |t|
      t.string :title, null: false
      t.text :description
      t.string :contact_person
      t.string :primary_email, null: false
      t.string :primary_phone
      t.string :website
      t.text :contacts
      t.string :status, default: 'pending'

      t.string :full_address
      t.string :house_number
      t.string :street
      t.string :city
      t.string :country
      t.string :region
      t.float :longitude
      t.float :latitude
    end
    add_reference :events, :firm, index: true,  foreign_key: true
  end
end
