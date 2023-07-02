# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_event,              mutation: Mutations::CreateEvent
    field :update_event,              mutation: Mutations::UpdateEvent
    field :remove_event,              mutation: Mutations::RemoveEvent

    field :create_firm,               mutation: Mutations::CreateFirm
    field :update_firm,               mutation: Mutations::UpdateFirm
    field :remove_firm,               mutation: Mutations::RemoveFirm

    field :sign_in,                   mutation: Mutations::SignIn
    field :sign_out,                  mutation: Mutations::SignOut

    field :set_up_account,            mutation: Mutations::SetUpAccount

    field :cancel_trip,               mutation: Mutations::CancelTrip

    field :book_event,                mutation: Mutations::BookEvent
    field :update_booking,            mutation: Mutations::UpdateBooking
    field :cancel_booking,            mutation: Mutations::CancelBooking
    field :update_attendee,           mutation: Mutations::UpdateAttendee
    field :register_attendee,         mutation: Mutations::RegisterAttendee

    field :create_checkout,           mutation: Mutations::CreateCheckout
    field :create_stripe_account,     mutation: Mutations::CreateStripeAccount

    field :verify_firm,               mutation: Mutations::VerifyFirm
    field :verify_event,              mutation: Mutations::VerifyEvent
    field :publish_event,             mutation: Mutations::PublishEvent
    field :unpublish_event,           mutation: Mutations::UnpublishEvent
    field :reschedule_event,          mutation: Mutations::RescheduleEvent
    field :sync_stripe,               mutation: Mutations::SyncStripe
  end
end
