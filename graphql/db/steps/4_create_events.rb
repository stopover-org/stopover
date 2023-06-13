with_images = ENV.fetch('without_images', 'false') == 'false'
events_count = ENV['count'] ? ENV['count'].to_i : 1000

['Utility terrain vehicles', 'UTV', 'All-terrain vehicles', 'ATV', 'Dirt Bikes', 'Dune Buggies', 'Rock Crawlers', 'Sandrails'].map { |u| Unit.create!(name: u, unit_type: :technique) }

%w[Table].map { |u| Unit.create!(name: u, unit_type: :common) }

random_from = lambda do |total, min = 0|
  value = (Random.rand * total).floor
  return value if value >= min

  min
end

random_hour = -> { rand(0...24) }

random_minute = -> { rand(0...60) }

random_hours = -> { "#{random_minute.call}m #{random_hour.call}h" }

random_day = -> { %w[Monday Tuesday Wednesday Thursday Friday Saturday Sunday].sample }

(0...events_count).each_slice(30) do |subset|
  threads = []

  subset.each do |int|
    threads << Thread.new do
      now = Time.zone.now + int.days
      price = random_from.call(100_000)

      event = Event.create!(
        title: Faker::App.name,
        description: Faker::Hipster.paragraphs.last,
        event_type: :excursion,
        recurring_type: :general,
        country: Faker::Address.country,
        city: Faker::Address.city,
        full_address: Faker::Address.full_address,
        unit: Unit.find(random_from.call(Unit.count) + 1),
        firm: User.find_by_email('mikhail@dorokhovich.ru').account.current_firm,
        max_attendees: [nil, 100].sample,
        duration_time: random_hours.call,
        status: :published,
        interests: [
          Interest.find(random_from.call(Interest.count) + 1),
          Interest.find(random_from.call(Interest.count) + 1),
          Interest.find(random_from.call(Interest.count) + 1)
        ],
        single_days_with_time: [
          now.change({ hour: random_hour.call, minute: random_minute.call }),
          (now + 1.day).change({ hour: random_hour.call, minute: random_minute.call }),
          (now + 3.months).change({ hour: random_hour.call, minute: random_minute.call })
        ],
        recurring_days_with_time: ["#{random_day.call} #{random_hour.call}:#{random_minute.call}"],
        organizer_price_per_uom: Money.new(price)
      )

      4.times do
        EventOption.create!(
          title: Faker::Coffee.blend_name,
          description: Faker::Coffee.notes,
          built_in: false,
          for_attendee: false,
          organizer_price: Money.new(random_from.call(1_000)),
          event: event
        )
        EventOption.create!(
          title: Faker::Coffee.blend_name,
          description: Faker::Coffee.notes,
          built_in: false,
          for_attendee: true,
          organizer_price: Money.new(random_from.call(4_000)),
          event: event
        )
        EventOption.create!(
          title: Faker::Coffee.blend_name,
          description: Faker::Coffee.notes,
          built_in: true,
          for_attendee: false,
          organizer_price: Money.new(random_from.call(8_000)),
          event: event
        )
        EventOption.create!(
          title: Faker::Coffee.blend_name,
          description: Faker::Coffee.notes,
          built_in: true,
          for_attendee: true,
          organizer_price: Money.new(random_from.call(12_000)),
          event: event
        )
        Rails.logger.info { "Event Options count: #{EventOption.count}, #{EventOption.last(4).map(&:id)}" }
      end

      40.times.each do
        Rating.create!(account: Account.all.sample, event: event, rating_value: random_from.call(5, 1))
      end

      Rails.logger.info { "#{event.id} #{event.title} was created" }

      Stopover::EventSupport.schedule(event)
      Rails.logger.info { "#{event.id} #{event.title} was scheduled" }

      ActiveRecord::Base.connection_pool.release_connection
    rescue StandardError => e
      Rails.logger.info("ERROR: #{e.message}")
      ActiveRecord::Base.connection_pool.release_connection
    end
  end
  threads.each(&:join)
end

Event.all.each do |event|
  Stopover::EventSupport.schedule(event) if event.schedules.count == 0
end

Event.all.each_slice(30) do |events|
  threads = []

  events.each do |event|
    threads << Thread.new do
      if with_images
        query = "Photorealistic art of #{event.interests.map(&:title).join(' and ')} #{event.tags.map(&:title).join(' ')} in #{event.country} #{event.city} #{event.street} with #{event.unit.name} #{event.unit.unit_type}. #{event.description}"
        Rails.logger.debug { "Starting cover generating for #{event.title} with query: #{query}" }
        AiCoverJob.perform_now(query, event.id)
        Rails.logger.debug 'Cover was generated'
      end
    end
  end

  threads.each(&:join)
end
