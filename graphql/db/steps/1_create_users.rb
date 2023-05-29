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