
Stopover::FlagsSupport.skip_notifications(skip: true) do
  Stopover::FlagsSupport.skip_stripe_integrations(skip: true) do
    Stopover::FlagsSupport.disable_phone_validation(skip: true) do
      Event.event_types.each_key do |key|
        Interest.find_or_create_by(title: key.humanize, description: key.humanize)
      end
    end
  end
end

ActiveRecord::Base.connection_pool.flush!
