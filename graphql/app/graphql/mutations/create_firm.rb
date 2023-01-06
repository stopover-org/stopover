# frozen_string_literal: true

module Mutations
  class CreateFirm < BaseMutation
    field :firm, Types::FirmType
    # argument :title, String
    # argument :primary_email, String
    argument :country, String
    argument :house_number, String

    def resolve(**args)
      firm = Firm.new(
        country: args[:country],
        house_number: args[:house_number]
      )

      firm.save!

      { firm: firm }
    end
  end
end
