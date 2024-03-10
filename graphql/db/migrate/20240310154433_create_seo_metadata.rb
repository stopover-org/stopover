class CreateSeoMetadata < ActiveRecord::Migration[7.0]
  def change
    create_table :seo_metadata do |t|
      t.string :title, default: ''
      t.string :description, default: ''
      t.string :keywords, default: ''
      t.string :language, default: 'en'

      t.timestamps
    end

    add_reference :events, :seo_metadatum
    add_reference :interests, :seo_metadatum
    add_reference :firms, :seo_metadatum
  end
end
