class CreateSeoMetadata < ActiveRecord::Migration[7.0]
  def change
    create_table :seo_metadata do |t|
      t.string :title, default: ''
      t.string :description, default: ''
      t.string :keywords, default: ''

      t.timestamps
    end

    add_reference :events, :seo_metadata
    add_reference :interests, :seo_metadata
    add_reference :firms, :seo_metadata
  end
end
