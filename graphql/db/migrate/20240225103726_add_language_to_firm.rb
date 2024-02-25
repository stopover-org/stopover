class AddLanguageToFirm < ActiveRecord::Migration[7.0]
  def change
    add_column :firms, :language, :string, default: 'en'
  end
end
