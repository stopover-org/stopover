# frozen_string_literal: true

module Mutations
  class UpdateFirm < BaseMutation
    field :firm, Types::FirmType

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

    def resolve(**args)
      raise GraphQL::ExecutionError, 'unauthorized'         unless context[:current_user]
      raise GraphQL::ExecutionError, 'user has no account'  unless context[:current_user].account
      raise GraphQL::ExecutionError, 'firm does not exist'  unless context[:current_user].account
                                                                                         .current_firm

      firm = context[:current_user].account.current_firm
      firm.update!(args.except(:image))

      if args[:image].present?
        firm.image.purge if firm.image.present?
        io_object = Stopover::FilesSupport.url_to_io(args[:image])
        firm.image.attach(io_object)
      elsif firm.image.present?
        firm.image.purge
      end

      { firm: firm }
    end
  end
end
