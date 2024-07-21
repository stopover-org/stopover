firms_data = SeedsHelper.get_data("./db/firms.xlsx")

Stopover::FlagsSupport.skip_notifications(skip: true) do
  Stopover::FlagsSupport.skip_stripe_integrations(skip: true) do
    Stopover::FlagsSupport.disable_phone_validation(skip: true) do
      emails = firms_data.pluck(:primary_email)
      emails << 'mikhail@dorokhovich.ru'
      emails << 100.times.map{ |n| "#{n}+mikhail@stopoverx.com" }
      emails.flatten!

      emails.each do |email|
        user = User.find_or_create_by(email: email)

        if email == 'mikhail@dorokhovich.ru'
          user.update!(service_user: true)
        end

        unless user.active?
          user.send_confirmation_code!(primary: 'email')
          user.activate!(code: user.confirmation_code)
          user.update!(last_try: nil)
        end
      rescue StandardError => e
        Rails.logger.warn(firm_data)
        Rails.logger.warn(e)
      end
    rescue StandardError => e
      Rails.logger.warn(e)
    end
  end
end


ActiveRecord::Base.connection_pool.flush!
