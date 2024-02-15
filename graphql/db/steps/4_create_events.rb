events_data = SeedsHelper.get_data('./db/events-prerelease.xlsx')

events_data.each do |event_data|
  firm = Firm.find_by_ref_number(event_data[:firm_ref])
  Rails.logger.info(firm.inspect)
  Rails.logger.info(event_data[:firm_ref])
  event = Event.new
  recurring_days_with_time = if event_data[:recurring_days_with_time]
                               event_data[:recurring_days_with_time].split(/,\s/)
                             else
                               []
                             end
  single_days_with_time = if event_data[:single_days_with_time]
                            begin
                              [DateTime.parse(event_data[:single_days_with_time].to_s)]
                            rescue StandardError
                              []
                            end
                          else
                            []
                          end

  next unless firm && event_data[:event_type]
  event.assign_attributes(
    **event_data.except(:firm_ref, :single_days_with_time, :recurring_days_with_time),
    ref_number: event_data[:ref_number] || event_data[:title].parameterize,
    firm: firm,
    address: firm.address.dup,
    recurring_days_with_time: recurring_days_with_time,
    single_days_with_time: single_days_with_time
  )
  event.save!
  event.unpublish!
  event.publish!
end

ScheduleAllEventsJob.perform_now
