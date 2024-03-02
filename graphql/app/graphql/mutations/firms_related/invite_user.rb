# frozen_string_literal: true

module Mutations
  module FirmsRelated
    class InviteUser < BaseMutation
      AUTHORIZATION_FIELD = 'current_firm'

      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::Authorizations::ManagerAuthorized

      field :account, Types::UsersRelated::AccountType

      argument :email, String, required: true

      def resolve(**args)
        firm = context[:current_user].account.current_firm

        user = User.find_by(email: args[:email].downcase)

        unless user
          user = User.create!(email: args[:email], status: :active)
          user.account = Account.create(user: user)
        end

        user.update!(status: :active) if user.temporary?

        return { account: nil, errors: [I18n.t('graphql.errors.user_already_invited')] } if user.account.account_firms.where(firm: firm).count.positive?

        user.account.account_firms.create!(firm: firm)
        user.account.update!(firm: firm)

        Notification.create!(
          delivery_method: 'email',
          to: user.email,
          subject: "You invited to #{firm.title}",
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/invitation',
            locals: {
              firm: firm,
              user: user
            }
          )
        )

        Notification.create!(
          delivery_method: 'email',
          to: firm.primary_email,
          subject: "You invited #{user.email}",
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/firms/user_invited',
            locals: {
              firm: firm,
              user: user
            }
          )
        )

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
