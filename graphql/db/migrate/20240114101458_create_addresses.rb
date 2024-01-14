class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.text :full_address
      t.string :country
      t.string :region
      t.string :city
      t.string :street
      t.string :house_number
      t.string :postal_code
      t.float :latitude
      t.float :longitude

      t.belongs_to :firm

      t.timestamps
    end

    add_reference :events, :address
    add_reference :firms, :address
    add_reference :accounts, :address

    change_table :trips do |t|
      t.remove :full_address, type: :string
      t.remove :country, type: :string
      t.remove :region, type: :string
      t.remove :city, type: :string
      t.remove :latitude, type: :float
      t.remove :longitude, type: :float
    end

    change_table :events do |t|
      t.remove :full_address, type: :string
      t.remove :country, type: :string
      t.remove :region, type: :string
      t.remove :city, type: :string
      t.remove :street, type: :string
      t.remove :house_number, type: :string
      t.remove :latitude, type: :float
      t.remove :longitude, type: :float
    end

    change_table :firms do |t|
      t.remove :full_address, type: :string
      t.remove :country, type: :string
      t.remove :region, type: :string
      t.remove :city, type: :string
      t.remove :street, type: :string
      t.remove :house_number, type: :string
      t.remove :latitude, type: :float
      t.remove :longitude, type: :float

      t.remove :contract_address, type: :string
    end

    change_table :accounts do |t|
      t.remove :full_address, type: :string
      t.remove :country, type: :string
      t.remove :region, type: :string
      t.remove :city, type: :string
      t.remove :street, type: :string
      t.remove :house_number, type: :string
      t.remove :postal_code, type: :string
      t.remove :latitude, type: :float
      t.remove :longitude, type: :float
    end
  end
end
