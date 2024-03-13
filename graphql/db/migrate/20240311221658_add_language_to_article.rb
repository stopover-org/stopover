class AddLanguageToArticle < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :language, :string, default: 'en'
    add_reference :articles, :seo_metadatum
    add_index :article_interests, %i[article_id interest_id], unique: true
  end
end
