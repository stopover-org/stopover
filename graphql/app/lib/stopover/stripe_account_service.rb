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

    def self.create_stripe_account(firm, account)
      country_code = ISO3166::Country.find_country_by_iso_short_name(firm.country)&.alpha2 || 'DE'
      stripe_account = Stripe::Account.create({
                                                type: 'express',
                                         country: country_code,
                                         email: firm.primary_email,
                                         capabilities: {
                                           card_payments: { requested: true },
                                           transfers: { requested: true }
                                         }
                                              })

      # Prefil company details before sending url to the customer
      if firm.individual?
        Stripe::Account.update(
          stripe_account.id,
          business_type: firm.business_type,
          individual: {
            address: {
              city: firm.city,
              country: country_code,
              line1: firm.street,
              postal_code: firm.postal_code
            },
            email: firm.primary_email,
            first_name: account.name,
            last_name: account.last_name,
            phone: firm.primary_phone
          }
        )
      end

      if firm.company?
        Stripe::Account.update(
          stripe_account.id,
          business_type: firm.business_type,
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

      firm.update!(stripe_account_id: stripe_account.id)

      account_link = Stripe::AccountLink.create({
                                                  account: stripe_account[:id],
                                                  refresh_url: "#{Rails.application.credentials.frontend_url}/my-firm/dashboard?stripe_connect=verify",
                                                  return_url: "#{Rails.application.credentials.frontend_url}/my-firm/dashboard?stripe_connect=verify",
                                                  type: 'account_onboarding'
                                                })
      {
        account_link: account_link.url
      }
    end
  end
end
