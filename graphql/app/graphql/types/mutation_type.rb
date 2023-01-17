# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_event, mutation: Mutations::CreateEvent
    field :update_event, mutation: Mutations::UpdateEvent
    field :remove_event, mutation: Mutations::RemoveEvent
    field :create_firm, mutation: Mutations::CreateFirm
    field :update_firm, mutation: Mutations::UpdateFirm
    field :remove_firm, mutation: Mutations::RemoveFirm
    field :sign_in, mutation: Mutations::SignIn
    field :set_up_account, mutation: Mutations::SetUpAccount
    field :book_event, mutation: Mutations::BookEvent
    field :update_booking, mutation: Mutations::UpdateBooking
    field :update_attendee, mutation: Mutations::UpdateAttendee
  end
end
