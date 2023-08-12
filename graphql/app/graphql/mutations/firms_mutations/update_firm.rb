# frozen_string_literal: true

module Mutations
  module FirmsMutations
    class UpdateFirm < BaseMutation
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
        current_firm.update!(args.except(:image))

        if args[:image].present?
          current_firm.image.purge if current_firm.image.present?
          io_object = Stopover::FilesSupport.url_to_io(args[:image])
          current_firm.image.attach(io_object)
        elsif current_firm.image.present?
          current_firm.image.purge
        end

        { firm: current_firm }
      end
    end
  end
end
