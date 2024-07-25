events_data = SeedsHelper.get_data('./db/events-prerelease.xlsx')

Stopover::FlagsSupport.skip_notifications(skip: true) do
  Stopover::FlagsSupport.skip_stripe_integrations(skip: true) do
    Stopover::FlagsSupport.disable_phone_validation(skip: true) do
      events_data.each do |event_data|
        firm = Firm.find_by(ref_number: event_data[:firm_ref])
        Rails.logger.info(firm.inspect)
        Rails.logger.info(event_data[:firm_ref])

        event = Event.find_or_initialize_by(ref_number: event_data[:ref_number] || event_data[:title].parameterize,)
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
        event.unpublish! unless event.unpublished?
        event.publish! unless event.published?
      end
    end
  end
end

ScheduleAllEventsJob.perform_now
