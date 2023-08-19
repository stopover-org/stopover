require 'roo'

firms_data = SeedsHelper.get_data('./db/firms.xlsx')
users_data = SeedsHelper.get_data('./db/users.xlsx').select { |user| user[:firm_ref].present? }

firms_data.each do |firm_data|
  associated_users = users_data.select { |user_data| user_data[:firm_ref] == firm_data[:ref_number] }
  firm = Firm.new
  firm.assign_attributes(**firm_data)
  associated_users.each do |user_data|
    user = User.find_by_email(user_data[:email])
    firm.account_firms.build(account: user.account)
  end
  firm.save!
end

ActiveRecord::Base.connection_pool.flush!
