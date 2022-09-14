# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'uri'

user = User.create(phone: '+79829320283')
user.send_confirmation_code!(primary: 'phone')
user.activate!(code: user.confirmation_code)
user.session_password = rand.to_s[2..16]

user = User.create(email: 'mikhail@dorokhovich.ru')
user.send_confirmation_code!(primary: 'email')
user.activate!(code: user.confirmation_code)
user.session_password = rand.to_s[2..16]

user = User.create(email: 'maxhooga@gmail.com')
user.send_confirmation_code!(primary: 'email')
user.activate!(code: user.confirmation_code)
user.session_password = rand.to_s[2..16]

100.times.each do |_n|
  interest = Faker::Food.ethnic_category
  Interest.create(title: interest, slug: interest.parameterize) unless Interest.find_by(title: interest)
end

%w[Снегоход Квадроцикл].map { |u| Unit.create!(name: u, unit_type: :technique) }
%w[Место Столик].map { |u| Unit.create!(name: u, unit_type: :common) }

count = ENV['count'].to_i || 1000

count.times.each do |_event|
  event_image = URI.open("https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/elymn/DSC03540_fa5f2e24-36ca-4587-923f-e389c3a46e4b.jpg")

  event = Event.create!(
    title: Faker::App.name,
    description: Faker::Hipster.paragraphs.last,
    event_type: :excursion,
    recurring_type: :regular,
    country: Faker::Address.country,
    city: Faker::Address.city,
    full_address: Faker::Address.full_address,
    unit: Unit.find((Random.rand * Unit.count).floor + 1),
    duration_time: '4h',
    status: :published,
    interests: [
      Interest.find((Random.rand * Interest.count).floor + 1),
      Interest.find((Random.rand * Interest.count).floor + 1),
      Interest.find((Random.rand * Interest.count).floor + 1)
    ],
    single_days_with_time: [
      Time.zone.now.change({ hour: 19, minute: 30 }),
      (Time.zone.now + 1.day).change({ hour: 19, minute: 30 }),
      (Time.zone.now + 3.months).change({ hour: 07, minute: 30 })
    ],
    # recurring_days_with_time: ["Monday 13:00", "Wednesday 13:00", "Friday 14:00"],
    recurring_days_with_time: ["Monday 13:00"],
    organizer_cost_per_uom_cents: 3000,
    attendee_cost_per_uom_cents: 3000,
  )
  event.images.attach(io: event_image, filename: "#{event.title}.jpg") unless ENV['without_images'] == 'true'
  puts "#{event.id} #{event.title} was created"
end
Event.first((count * 0.25).to_i).each { |e| e.update!(status: :draft) }
