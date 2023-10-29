# frozen_string_literal: true

module Mutations
  module AuthRelated
    class UpdateAccount < BaseMutation
      field :account, Types::UsersRelated::AccountType, null: false

      argument :primary_email, String
      argument :primary_phone, String
      argument :name,          String
      argument :country,       String
      argument :city,          String
      argument :region,        String
      argument :date_of_birth, Types::DateTimeType, required: false

      def resolve(**args)
        current_account.assign_attributes(args)
        current_account.save!

        { account: current_account, notification: '' }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          account: nil,
          errors: [message]
        }
      end
    end
  end
end
