# frozen_string_literal: true

module Stopover
  class StripeAccountService
    def self.create_stripe_account(user)
      raise StandardError('Account has\'t firm') unless user.account.current_firm
      account = Stripe::Account.create({
                                         type: 'custom',
                                         country: user.account.country,
                                         email: user.email,
                                         capabilities: {
                                           card_payments: { requested: true },
                                           transfers: { requested: true }
                                         }
                                       })
      # Prefil company details before sending url to the customer
      if user.account.current_firm.individual?
        Stripe::Account.update(
          account.id,
          business_type: user.account.current_firm.business_type,
          individual: {
            address: {
              city: user.account.city,
              country: user.account.country,
              line1: user.account.street,
              postal_code: user.account.postal_code
            },
            email: user.email,
            first_name: user.account.name,
            last_name: user.account.last_name,
            phone: user.account.phones.first
          }
        )
      end

      if user.account.current_firm.company?
        Stripe::Account.update(
          account.id,
          business_type: user.account.current_firm.business_type,
          company: {
            address: {
              city: user.account.current_firm.city,
              country: user.account.current_firm.country,
              line1: user.account.current_firm.street,
              line2: nil,
              postal_code: user.account.current_firm.postal_code,
              state: user.account.current_firm.region
            }
          }
        )
      end

      user.account.current_firm.update!(stripe_account_id: account.id)

      account_link = Stripe::AccountLink.create({
                                                  account: account[:id],
                                                  refresh_url: 'https://example.com/reauth',
                                                  return_url: 'https://example.com/return',
                                                  type: 'account_onboarding'
                                                })
      {
        account_link: account_link.url
      }
    rescue StandardError => e
      Rails.logger.debug 'something went wrong when creating account and account link in stripe'
      {
        account_link: nil
      }
    end
  end
end
