class CreateArticleInterests < ActiveRecord::Migration[7.0]
  def change
    create_table :article_interests do |t|
      t.references :article
      t.references :interest

      t.timestamps
    end
  end
end
