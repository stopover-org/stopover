User.all.each do |user|
  firm = Firm.new(
    title: Faker::App.name,
    primary_email: Faker::Internet.email,
  )

  firm.account_firms.build(account: user.account)
  firm.save!
end