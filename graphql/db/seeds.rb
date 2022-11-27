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

titles = (0...interests_count * 10).map{ Faker::Internet.username(specifier: 5..10) }.uniq

event_image = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview.jpg"), filename: "event_preview.jpg")
event_image1 = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview1.png"), filename: "event_preview1.png")
event_image2 = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview2.png"), filename: "event_preview2.png")
event_image3 = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview3.png"), filename: "event_preview3.png")
event_image4 = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview4.png"), filename: "event_preview4.png")
event_image5 = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/event_preview5.png"), filename: "event_preview5.png")

interest_image = ActiveStorage::Blob.create_and_upload!(io: File.open("#{__dir__}/interest_preview.jpg"), filename: "interest_preview.jpg")


(0...interests_count).each_slice(30) do |subset|
  threads = []

  subset.each do
    threads << Thread.new do
      title = titles.pop
      slug = title.parameterize
      unless Interest.find_by_title(title) || Interest.find_by_slug(slug)
        interest = Interest.create!(title: title, slug: slug)
        interest.preview.attach(interest_image)
        puts "Interest was created #{interest.id}"
      else
        puts "skip"
      end

      ActiveRecord::Base.connection_pool.release_connection
    rescue => e
      puts e.message
      ActiveRecord::Base.connection_pool.release_connection
    end
  end

  threads.each(&:join)
end

%w[Снегоход Квадроцикл].map { |u| Unit.create!(name: u, unit_type: :technique) }
%w[Место Столик].map { |u| Unit.create!(name: u, unit_type: :common) }

random_from = -> (total, min = 0) do
    value = (Random.rand * total).floor
    return value if value >= min
    min
end

random_hour = -> { rand(0...24) }

random_minute = -> { rand(0...60) }

random_hours = -> { "#{random_minute.call}m #{random_hour.call}h" }

random_day = -> { %w(Monday Tuesday Wednesday Thursday Friday Saturday Sunday).sample}

ActiveRecord::Base.connection_pool.flush!


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
        organizer_cost_per_uom_cents: price,
        attendee_cost_per_uom_cents: price * 0.8,
        event_options: [1..4].map{
          EventOption.new(
            title: Faker::Coffee.blend_name,
            description: Faker::Coffee.notes,
            built_in: [true, false].sample,
            for_attendee: [true, false].sample
          )
        }
      )
      unless ENV['without_images'] == 'true'
        event.images.attach(event_image)
        event.images.attach(event_image1)
        event.images.attach(event_image2)
        event.images.attach(event_image3)
        event.images.attach(event_image4)
        event.images.attach(event_image5)
      end
      (0...random_from.call(40)).map{ Rating.create!(account: Account.all.sample, event: event, rating_value: random_from.call(5, 1)) }
      puts "#{event.id} #{event.title} was created"

      ActiveRecord::Base.connection_pool.release_connection
    rescue => e
      puts e.message
      ActiveRecord::Base.connection_pool.release_connection
    end
  end

  threads.each(&:join)
end

Event.first((events_count * 0.25).to_i).each { |e| e.update!(status: :draft) }

trip = Trip.create!(account: Account.last, status: :draft)

Event.where.not(single_days_with_time: []).last(10).each do |event|
  event.bookings.create!(booked_for: event.single_days_with_time.first, trip: trip)
end