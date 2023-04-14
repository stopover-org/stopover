# frozen_string_literal: true

module Mutations
  class CreateStripeAccount < BaseMutation
    field :firm, Types::FirmType
    def resolve
      StripeSupport(context[:current_user])
    end
  end
end
