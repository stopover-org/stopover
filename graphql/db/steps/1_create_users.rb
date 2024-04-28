firms_data = SeedsHelper.get_data("./db/firms.xlsx")

Flipper.enable(:skip_notifications_delivery)

firms_data.each do |firm_data|
  user = User.new
  user.assign_attributes(email: firm_data[:primary_email])
  user.save!
  user.send_confirmation_code!(primary: 'email')
  user.activate!(code: user.confirmation_code)
  user.update(last_try: nil)
end

user = User.new
user.email = 'mikhail@dorokhovich.ru'
user.service_user = true
user.save!
user.send_confirmation_code!(primary: 'email')
user.activate!(code: user.confirmation_code)
user.update(last_try: nil)

100.times.each do |n|
  user = User.new
  user.email = "#{n}+mikhail@stopoverx.com"
  user.save!
  user.send_confirmation_code!(primary: 'email')
  user.activate!(code: user.confirmation_code)
  user.update(last_try: nil)
end

Flipper.disable(:skip_notifications_delivery)

ActiveRecord::Base.connection_pool.flush!
