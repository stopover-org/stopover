# frozen_string_literal: true

module Mutations
  class CreateStripeAccount < BaseMutation
    field :setup_account_url, String
    def resolve
      account_link = StripeSupport(context[:current_user])
      {
        setup_account_url: account_link[:account_link]
      }
    end
  end
end
