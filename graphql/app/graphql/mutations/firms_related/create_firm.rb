# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class CreateFirm < BaseMutation
      field :firm, Types::FirmsRelated::FirmType

      argument :city,           String, required: true
      argument :contact_person, String, required: true
      argument :contacts,       String, required: false
      argument :country,        String, required: true
      argument :description,    String, required: false
      argument :full_address,   String, required: false
      argument :house_number,   String, required: false
      argument :image,          String, required: false
      argument :latitude,       Float,  required: false
      argument :longitude,      Float,  required: false
      argument :primary_email,  String, required: true
      argument :primary_phone,  String, required: true
      argument :region,         String, required: false
      argument :status,         String, required: false
      argument :street,         String, required: false
      argument :title,          String, required: false
      argument :website,        String, required: false
      argument :payment_types,  [String], required: true

      def resolve(**args)
        firm = Firm.new
        args[:country] = ISO3166::Country.find_country_by_any_name(args[:country]).iso_short_name if args[:country]
        firm.assign_attributes(args.except(:image))

        firm.primary_email = context[:current_user].email if args[:primary_email].blank?
        firm.primary_phone = context[:current_user].phone if args[:primary_phone].blank?

        firm.account_firms.build(account: context[:current_user].account)
        firm.save!

        if args[:image].present?
          io_object = Stopover::FilesSupport.url_to_io(args[:image])
          firm.image.attach(io_object)
        end

        { firm: firm,
          notification: I18n.t('graphql.mutations.create_firm.notifications.success') }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        { errors: [message],
          firm: nil }
      end

      def authorized?(**inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if current_user&.temporary?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if current_user&.inactive?
        return false, { errors: [I18n.t('graphql.errors.general')] } if current_firm

        super
      end
    end
  end
end
