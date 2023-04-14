# frozen_string_literal: true

module Mutations
  class CreateStripeAccount < BaseMutation
    field :firm, Types::FirmType

    argument :user, ID, loads: Types::UserType
  end
end
