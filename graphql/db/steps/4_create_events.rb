with_images = ENV.fetch('without_images', 'false') == 'false'

events_data = SeedsHelper.get_data('./db/events.xlsx')
event_options_data = SeedsHelper.get_data('./db/event_options.xlsx')

events_data.each do |event_data|
  firm = Firm.find_by_ref_number(event_data[:firm_ref])
  Rails.logger.info(firm.inspect)
  Rails.logger.info(event_data[:firm_ref])
  event = Event.new
  recurring_days_with_time = if event_data[:recurring_days_with_time]
                               event_data[:recurring_days_with_time].downcase.split(/,\s/)
                             else
                               []
                             end
  single_days_with_time = if event_data[:single_days_with_time]
                            [DateTime.parse(event_data[:single_days_with_time].to_s)]
                          else
                            []
                          end
  event.assign_attributes(
    **event_data.except(:firm_ref, :single_days_with_time, :recurring_days_with_time),
    firm: firm,
    interests: Interest.last(4),
    country: firm.country,
    region: firm.region,
    city: firm.city,
    street: firm.street,
    house_number: firm.house_number,
    full_address: firm.full_address,
    recurring_days_with_time: recurring_days_with_time,
    single_days_with_time: single_days_with_time
  )
  event.save!

  options = event_options_data.select { |option_data| option_data[:event_ref] == event.ref_number }
  options.each do |option_data|
    event_option = EventOption.new
    event_option.assign_attributes(**option_data.except(:event_ref),
                                   event: event)
    event_option.save!
  end

  next unless with_images
  3.times.each do
    query = "Photorealistic art of #{event.interests.map(&:title).join(' and ')} #{event.tags.map(&:title).join(' ')} in #{event.country} #{event.city} #{event.street}. #{event.description}"
    Rails.logger.debug { "Starting cover generating for #{event.title} with query: #{query}" }
    AiCoverJob.perform_now(query, event.id)
    Rails.logger.debug 'Cover was generated'
  end
end
