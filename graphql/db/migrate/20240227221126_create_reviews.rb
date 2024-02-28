class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :event
      t.references :firm
      t.references :account
      t.integer :attendees_count
      t.string :language
      t.string :author
      t.string :title
      t.text :description

      t.timestamps
    end

    add_reference :ratings, :review
  end
end
