class AddLanguageToAccount < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :language, :string, default: 'en', null: false
  end
end
