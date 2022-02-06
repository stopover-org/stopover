# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
user = User.create(phone: '+79829320283')
user.send_confirmation_code!(primary: 'phone')
user.activate!(code: user.confirmation_code)
user.session_password = rand.to_s[2..16]

user = User.create(email: 'mikhail@dorokhovich.ru')
user.send_confirmation_code!(primary: 'email')
user.activate!(code: user.confirmation_code)
user.session_password = rand.to_s[2..16]

100.times.each do |_n|
  interest = Faker::Food.ethnic_category
  Interest.create(title: interest, slug: interest.parameterize) unless Interest.find_by(title: interest)
end

%w[Снегоход Квадроцикл].map { |u| Unit.create!(name: u, unit_type: :technique) }
%w[Место Столик].map { |u| Unit.create!(name: u, unit_type: :common) }
