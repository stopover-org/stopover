# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class UpdateFirm < BaseMutation
      field :firm, Types::FirmsRelated::FirmType

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
        firm = context[:current_user].account.current_firm
        firm.update!(args.except(:image))

        if args[:image].present?
          firm.image.purge if firm.image.present?
          io_object = Stopover::FilesSupport.url_to_io(args[:image])
          firm.image.attach(io_object)
        elsif firm.image.present?
          firm.image.purge
        end

        { firm: firm, notification: 'Firm was updated' }
      rescue StandardError => e
        { errors: [e.message], notification: 'Something went wrong' }
      end

      def authorized?(**inputs)
        return false, { errors: ['You are not authorized'] } unless current_user
        return false, { errors: ['You are not authorized'] } if current_user&.temporary?
        return false, { errors: ['You are not authorized'] } if current_user&.inactive?
        return false, { errors: ['You don\'t have firm'] } unless current_firm
        super
      end
    end
  end
end
