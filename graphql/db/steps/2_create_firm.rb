firms_data = SeedsHelper.get_data('./db/firms.xlsx')

def find_and_attach(ref)
  firm = Firm.find_by_ref_number(ref)
  images_dir = "./db/images/firms"
  image_path ="#{images_dir}/#{firm.ref_number}"
  if File.exists?("#{image_path}.png")
    firm.image.attach(io: File.open("#{image_path}.png"), filename: "#{firm.ref_number}.png")
  elsif File.exists?("#{image_path}.jpg")
    firm.image.attach(io: File.open("#{image_path}.jpg"), filename: "#{firm.ref_number}.jpg")
  end
end

firms_data.each do |firm_data|
  associated_user = User.find_by_email(firm_data[:primary_email])
  firm = Firm.new
  country = ISO3166::Country.find_country_by_any_name(firm_data[:country]).iso_short_name
  firm.assign_attributes(**firm_data.except(:country), country: country)
  firm.account_firms.build(account: associated_user.account)
  firm.save!
  find_and_attach(firm.ref_number)
  firm.activate!
end

ActiveRecord::Base.connection_pool.flush!
