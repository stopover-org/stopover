# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_event, mutation: Mutations::CreateEvent
    field :create_firm, mutation: Mutations::CreateFirm
    field :update_firm, mutation: Mutations::UpdateFirm
    field :sign_in, mutation: Mutations::SignIn
    field :set_up_account, mutation: Mutations::SetUpAccount
    field :book_event, mutation: Mutations::BookEvent
    field :update_booking, mutation: Mutations::UpdateBooking
    field :update_attendee, mutation: Mutations::UpdateAttendee
  end
end
