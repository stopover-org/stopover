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
interests_count = 100

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

titles = (0...interests_count * 10).map { Faker::Internet.username(specifier: 5..10) }.uniq

event_image = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview.jpg"),
                                                     filename: 'event_preview.jpg')
event_image1 = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview1.png"),
                                                      filename: 'event_preview1.png')
event_image2 = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview2.png"),
                                                      filename: 'event_preview2.png')
event_image3 = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview3.png"),
                                                      filename: 'event_preview3.png')
event_image4 = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview4.png"),
                                                      filename: 'event_preview4.png')
event_image5 = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview5.png"),
                                                      filename: 'event_preview5.png')

interest_image = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/interest_preview.jpg"),
                                                        filename: 'interest_preview.jpg')

(0...interests_count).each_slice(30) do |subset|
  threads = []

  subset.each do
    threads << Thread.new do
      title = titles.pop
      slug = title.parameterize
      if Interest.find_by(title: title) || Interest.find_by(slug: slug)
        Rails.logger.debug 'skip'
      else
        interest = Interest.create!(title: title, slug: slug)
        interest.preview.attach(interest_image)
        Rails.logger.debug { "Interest was created #{interest.id}" }
      end

      ActiveRecord::Base.connection_pool.release_connection
    rescue StandardError => e
      Rails.logger.debug e.message
      ActiveRecord::Base.connection_pool.release_connection
    end
  end

  threads.each(&:join)
end

%w[Снегоход Квадроцикл].map { |u| Unit.create!(name: u, unit_type: :technique) }
%w[Место Столик].map { |u| Unit.create!(name: u, unit_type: :common) }

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
  accounts: [Account.last],
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
        max_attendees: [nil, rand(0..100)].sample,
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

      (1..4).each do
        EventOption.create!(
          title: Faker::Coffee.blend_name,
          description: Faker::Coffee.notes,
          built_in: true,
          for_attendee: false,
          organizer_price: Money.new(random_from.call(10_000)),
          event: event
        )
        EventOption.create!(
          title: Faker::Coffee.blend_name,
          description: Faker::Coffee.notes,
          built_in: true,
          for_attendee: true,
          organizer_price: Money.new(random_from.call(10_000)),
          event: event
        )
        Rails.logger.debug { "Event Options count: #{EventOption.count}" }
      end

      unless ENV.fetch('without_images', nil) == 'true'
        event.images.attach(event_image)
        event.images.attach(event_image1)
        event.images.attach(event_image2)
        event.images.attach(event_image3)
        event.images.attach(event_image4)
        event.images.attach(event_image5)
      end

      (0...random_from.call(40)).map do
        Rating.create!(account: Account.all.sample, event: event, rating_value: random_from.call(5, 1))
      end
      Rails.logger.debug { "#{event.id} #{event.title} was created" }

      ActiveRecord::Base.connection_pool.release_connection
    rescue StandardError => e
      Rails.logger.debug e.message
      ActiveRecord::Base.connection_pool.release_connection
    end
  end

  threads.each(&:join)
end

Event.first((events_count * 0.25).to_i).each { |e| e.update!(status: :draft) }

trip = Trip.create!(account: Account.last, status: :draft)

Event.where.not(single_days_with_time: []).last(10).each do |event|
  EventSupport.schedule(event)
  event.bookings.create!(event_id: event.id, schedule_id: Schedule.last.id, trip: trip)
end
