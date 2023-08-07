require 'roo'

users_data = SeedsHelper.get_data('./db/users.xlsx')

users_data.each do |user_data|
  user = User.new
  user.assign_attributes(**user_data.except(:firm_ref))
  user.save!
  user.send_confirmation_code!(method: 'email')
  user.activate!(code: user.confirmation_code)
end

ActiveRecord::Base.connection_pool.flush!
