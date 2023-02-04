FactoryBot.define do
  factory :tag do
    title { Faker::Hipster.name }
  end
end