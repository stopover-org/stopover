require 'roo'

firms_data = SeedsHelper.get_data("./db/firms.xlsx")

firms_data.each do |firm_data|
  user = User.new
  user.assign_attributes(email: firm_data[:primary_email])
  user.save!
  user.send_confirmation_code!(primary: 'email')
  user.activate!(code: user.confirmation_code)
  user.update(last_try: nil)
end

ActiveRecord::Base.connection_pool.flush!
