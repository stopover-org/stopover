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

    Firm.all.each do |firm|
      firm.send(:adjust_seo_metadata)
    end

    Interest.all.each do |interest|
      interest.send(:adjust_seo_metadata)
    end

    Event.all.each do |event|
      event.send(:adjust_seo_metadata)
    end

    SeoMetadatum.where(description: nil).update_all(description: '')
    SeoMetadatum.where(title: nil).update_all(title: '')
    SeoMetadatum.where(keywords: nil).update_all(keywords: '')
  end
end
