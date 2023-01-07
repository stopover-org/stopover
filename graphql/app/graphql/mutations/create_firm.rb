# frozen_string_literal: true

module Mutations
  class CreateFirm < BaseMutation
    field :firm, Types::FirmType

    argument :city, String, required: false
    argument :contact_person, String, required: false
    argument :contacts, String, required: false
    argument :country, String, required: false
    argument :description, String, required: false
    argument :full_address, String, required: false
    argument :house_number, String, required: false
    argument :latitude, Float, required: false
    argument :longitude, Float, required: false
    argument :primary_email, String, required: false
    argument :primary_phone, String, required: false
    argument :region, String, required: false
    argument :status, String, required: false
    argument :street, String, required: false
    argument :title, String, required: false
    argument :website, String, required: false

    def resolve(**args)
      firm = Firm.new(args)

      firm.accounts.push(context[:current_user].account)
      firm.primary_email = context[:current_user].email if args[:primary_email].blank?
      firm.primary_phone = context[:current_user].phone if args[:primary_phone].blank?

      firm.save!

      { firm: firm }
    end
  end
end
