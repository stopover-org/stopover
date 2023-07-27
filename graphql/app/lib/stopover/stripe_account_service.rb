# frozen_string_literal: true

module Stopover
  class StripeAccountService
    def self.retrieve_stripe_connect(stripe_connect_id)
      stripe_connect = StripeConnect.find_by(stripe_connect_id: stripe_connect_id)
      Stripe::Account.retrieve(stripe_connect.stripe_connect_id)
    end

    def self.activate(stripe_connect_id)
      stripe_connect = StripeConnect.find_by(stripe_connect_id: stripe_connect_id)

      stripe_connect.activate!

      stripe_connect
    end

    def self.dactivate(stripe_connect_id)
      stripe_connect = StripeConnect.find_by(stripe_connect_id: stripe_connect_id)
      stripe_connect.deactivate!

      stripe_connect
    end

    def self.create_stripe_account(user)
      raise StandardError('Account has\'t firm') unless user.account.current_firm
      firm = user.account.current_firm
      country_code = ISO3166::Country.find_country_by_iso_short_name(firm.country)&.alpha2 || 'DE'
      account = Stripe::Account.create({
                                         type: 'express',
                                         country: country_code,
                                         email: firm.primary_email,
                                         capabilities: {
                                           card_payments: { requested: true },
                                           transfers: { requested: true }
                                         }
                                       })

      # Prefil company details before sending url to the customer
      if user.account.current_firm.individual?
        Stripe::Account.update(
          account.id,
          business_type: firm.business_type,
          individual: {
            address: {
              city: firm.city,
              country: country_code,
              line1: firm.street,
              postal_code: firm.postal_code
            },
            email: firm.primary_email,
            first_name: user.account.name,
            last_name: user.account.last_name,
            phone: firm.primary_phone
          }
        )
      end

      if user.account.current_firm.company?
        Stripe::Account.update(
          account.id,
          business_type: user.account.current_firm.business_type,
          company: {
            address: {
              city: firm.city,
              country: country_code,
              line1: firm.street,
              line2: nil,
              postal_code: firm.postal_code,
              state: firm.region
            }
          }
        )
      end

      user.account.current_firm.update!(stripe_account_id: account.id)

      account_link = Stripe::AccountLink.create({
                                                  account: account[:id],
                                                  refresh_url: "#{Rails.application.credentials.frontend_url}/my-firm/dashboard?stripe_connect=verify",
                                                  return_url: "#{Rails.application.credentials.frontend_url}/my-firm/dashboard?stripe_connect=verify",
                                                  type: 'account_onboarding'
                                                })
      {
        account_link: account_link.url
      }
    rescue StandardError => e
      Sentry.capture_exception(e) if Rails.env.production?

      {
        account_link: nil
      }
    end
  end
end
