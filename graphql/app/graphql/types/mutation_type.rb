# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_event, mutation: Mutations::CreateEvent
    field :sign_in, mutation: Mutations::SignIn
    field :set_up_account, mutation: Mutations::SetUpAccount
    field :book_event, mutation: Mutations::BookEvent
    field :update_booking, mutation: Mutations::UpdateBooking
  end
end
