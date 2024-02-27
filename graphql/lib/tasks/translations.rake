desc 'refresh translations'
task refresh_translations: :environment do
  models = [Firm, Event, EventOption, TourPlan, TourPlace, Interest]
  models.each do |model|
    model.all.each do |record|
      record.adjust_translations
    end
  end
end
