# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class InviteUser < BaseMutation
      field :account, Types::UsersRelated::AccountType

      argument :email, String, required: true

      def resolve(**args)
        firm = context[:current_user].account.current_firm

        user = User.find_by(email: args[:email].downcase)

        unless user
          user = User.create!(email: args[:email])
          user.account = Account.create(user: user)
        end

        return { account: nil, errors: [I18n.t('graphql.errors.user_already_invited')] } if user.account.account_firms.where(firm: firm).count.positive?

        user.account.account_firms.create!(firm: firm)

        { account: user.account, notification: I18n.t('graphql.mutations.invite_user.notifications.success') }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        { errors: [message], account: nil }
      end

      def authorized?(**inputs)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_firm
        return false, { errors: [I18n.t('graphql.errors.firm_removed')] } if current_firm.removed?

        super
      end
    end
  end
end
