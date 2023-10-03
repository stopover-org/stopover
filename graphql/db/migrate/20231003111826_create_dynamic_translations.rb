class CreateDynamicTranslations < ActiveRecord::Migration[7.0]
  def up
    create_table :dynamic_translations do |t|
      t.string :source,           null: false
      t.string :source_field,     null: false
      t.string :target_language,  null: false
      t.references :translatable, polymorphic: true
      t.string :translation,      null: false, default: ''

      t.timestamps
    end

    add_column :events,         :language, :string, default: 'en'
    add_column :event_options,  :language, :string, default: 'en'
    add_column :interests,      :language, :string, default: 'en'
    add_column :tags,           :language, :string, default: 'en'
    add_column :achievements,   :language, :string, default: 'en'
  end
end
