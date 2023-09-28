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

        { firm: firm,
          notification: I18n.t('graphql.mutations.update_firm.notifications.success') }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        { errors: [message], firm: nil }
      end

      def authorized?(**inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if current_user&.temporary?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if current_user&.inactive?
        return false, { errors: [I18n.t('graphql.errors.general')] } unless current_firm

        super
      end
    end
  end
end
