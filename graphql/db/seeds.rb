# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'uri'

events_count = ENV['count'] ? ENV['count'].to_i : 1000

Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'false')

user = User.create!(phone: '+79829320283')
user.send_confirmation_code!(primary: 'phone')
user.activate!(code: user.confirmation_code)

user = User.create!(email: 'mikhail@dorokhovich.ru')
user.send_confirmation_code!(primary: 'email')
user.activate!(code: user.confirmation_code)

user = User.create!(email: 'maxhooga@gmail.com')
user.send_confirmation_code!(primary: 'email')
user.activate!(code: user.confirmation_code)

ActiveRecord::Base.connection_pool.flush!

titles = ['Active mobility', 'Adventure travel', 'Air travel', 'Backpacking (travel)', 'Bleisure travel', 'Business tourism', 'Business travel', 'Circuit riding', 'Travel class', 'College tour', 'Commuting', 'Creative trip', 'Cruising (maritime)', 'Cultural travel', 'Experiential travel', 'Field trip', 'First class (aviation)', 'Flight shame', 'Global nomad', 'Grand Tour', 'Honeymoon', 'Mancation', 'Overseas experience', 'Package tour', 'Park and Pedal commuting', 'Pet travel', 'Recreational travel', 'Repositioning cruise', 'River cruise', 'Road trip', 'Safari', 'School camp', 'Train surfing', 'Travel incentive', 'Vacation', 'Visiting friends and relatives']

Rails.logger.info "let's generate cover for all interest"
Rails.logger.info "for query: The man that interested in #{titles.join(' ')} "
interest_image = Stopover::AiCoverService.new("The man that interested in #{titles.join(' ')}").fetch
Rails.logger.info interest_image
Rails.logger.info 'interest cover was generated'

(0...titles.count).each_slice(30) do |subset|
  threads = []

  subset.each do
    threads << Thread.new do
      title = titles.pop
      slug = title.parameterize
      if Interest.find_by(title: title) || Interest.find_by(slug: slug)
        Rails.logger.info 'skip'
      else
        interest = Interest.create!(title: title, slug: slug)
        interest.preview.attach(io: URI.parse(interest_image).open, filename: SecureRandom.hex.to_s)
        Rails.logger.info { "Interest was created #{interest.id}" }
      end

      ActiveRecord::Base.connection_pool.release_connection
    rescue StandardError => e
      Rails.logger.info("ERROR: #{e.message}")
      ActiveRecord::Base.connection_pool.release_connection
    end
  end

  threads.each(&:join)
end

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

ActiveRecord::Base.connection_pool.flush!

firm = Firm.create!(
  title: Faker::App.name,
  primary_email: Faker::Internet.email,
  accounts: [Account.last]
)

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
        recurring_type: :regular,
        country: Faker::Address.country,
        city: Faker::Address.city,
        full_address: Faker::Address.full_address,
        unit: Unit.find(random_from.call(Unit.count) + 1),
        firm: firm,
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

trip = Trip.create!(account: User.find_by(email: 'mikhail@dorokhovich.ru').account, status: :draft)

Event.last(10).each do |event|
  event.bookings.create!(event_id: event.id,
                         schedule: event.schedules.first,
                         trip: trip,
                         attendees: 5.times.map { Attendee.new })
end

Event.all.each_slice(30) do |events|
  threads = []

  events.each do |event|
    threads << Thread.new do
      unless ENV.fetch('without_images', nil) == 'true'
        query = "art of #{event.interests.map(&:title).join(' and ')} #{event.tags.map(&:title).join(' ')} in #{event.country} #{event.city} #{event.street} with #{event.unit.name} #{event.unit.unit_type}"
        Rails.logger.debug { "Starting cover generating for #{event.title} with query: #{query}" }
        AiCoverJob.perform_now(query, event.id)
        Rails.logger.debug 'Cover was generated'
      end
    end
  end

  threads.each(&:join)
end
