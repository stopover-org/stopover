# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class UpdateFirm < BaseMutation
      AUTHORIZATION_FIELD = 'current_firm'

      include Mutations::FirmsRelated::Authorizations::FirmAuthorized
      include Mutations::Authorizations::ManagerAuthorized

      field :firm, Types::FirmsRelated::FirmType

      argument :city, String, required: false
      argument :contact_person, String, required: false
      argument :contacts, String, required: false
      argument :contract_address, String, required: false
      argument :country, String, required: false
      argument :description, String, required: false
      argument :full_address, String, required: false
      argument :house_number, String, required: false
      argument :image, String, required: false
      argument :latitude, Float, required: false
      argument :longitude, Float, required: false
      argument :payment_types, [String], required: false
      argument :primary_email, String, required: false
      argument :primary_phone, String, required: false
      argument :region, String, required: false
      argument :status, String, required: false
      argument :street, String, required: false
      argument :title, String, required: false
      argument :website, String, required: false
      argument :margin, Integer, required: false
      argument :available_payment_methods, [String], required: false
      argument :firm_type, String, required: false

      def resolve(**args)
        firm = context[:current_user].account.current_firm

        Firm.transaction do
          args[:country] = ISO3166::Country.find_country_by_any_name(args[:country]).iso_short_name if args[:country]
          address = firm.address || Address.new(firm: firm)
          address.assign_attributes(args.slice(:full_address,
                                               :country,
                                               :region,
                                               :city,
                                               :street,
                                               :house_number,
                                               :latitude,
                                               :longitude))
          address.save!
          firm.update!(address: address, **args.except(:image,
                                                       :full_address,
                                                       :country,
                                                       :region,
                                                       :city,
                                                       :street,
                                                       :house_number,
                                                       :latitude,
                                                       :longitude))

          if args.key?(:image)
            firm.image.purge
            io_object = Stopover::FilesSupport.url_to_io(args[:image])

            firm.image.attach(io_object)
          end
        end

        { firm: firm,
          notification: I18n.t('graphql.mutations.update_firm.notifications.success') }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        { errors: [message], firm: nil }
      end
    end
  end
end
