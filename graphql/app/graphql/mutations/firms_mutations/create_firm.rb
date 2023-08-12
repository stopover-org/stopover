# frozen_string_literal: true

module Mutations
  module FirmsMutations
    class CreateFirm < BaseMutation
      manager_only

      field :firm, Types::FirmRelated::FirmType

      argument :city,           String, required: false
      argument :contact_person, String, required: false
      argument :contacts,       String, required: false
      argument :country,        String, required: false
      argument :description,    String, required: false
      argument :full_address,   String, required: false
      argument :house_number,   String, required: false
      argument :image,          String, required: false
      argument :latitude,       Float,  required: false
      argument :longitude,      Float,  required: false
      argument :primary_email,  String, required: false
      argument :primary_phone,  String, required: false
      argument :region,         String, required: false
      argument :status,         String, required: false
      argument :street,         String, required: false
      argument :title,          String, required: false
      argument :website,        String, required: false
      argument :payment_types,  [String], required: false

      def resolve(**args)
        firm = Firm.new
        firm.assign_attributes(args.except(:image))

        firm.primary_email = current_user.email if args[:primary_email].blank?
        firm.primary_phone = current_user.phone if args[:primary_phone].blank?

        firm.account_firms.build(firm: firm, account: current_account)
        firm.save!

        if args[:image]
          io_object = Stopover::FilesSupport.base64_to_file(args[:image])
          firm.image.attach(io_object)
        end

        { firm: firm }
      end
    end
  end
end
