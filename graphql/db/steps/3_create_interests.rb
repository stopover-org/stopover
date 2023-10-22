Event.event_types.keys.each do |key|
  Interest.create!(title: key.humanize)
end

ActiveRecord::Base.connection_pool.flush!
