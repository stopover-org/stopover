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
    field :remove_booking,            mutation: Mutations::RemoveBooking
    field :update_attendee,           mutation: Mutations::UpdateAttendee
    field :register_attendee,         mutation: Mutations::RegisterAttendee

    field :create_checkout,           mutation: Mutations::CreateCheckout
    field :create_stripe_account,     mutation: Mutations::CreateStripeAccount
    field :create_successful_payment, mutation: Mutations::SuccessfulPayment
    field :create_canceled_payment,   mutation: Mutations::CanceledPayment

    field :verify_firm,               mutation: Mutations::VerifyFirm
    field :verify_event,              mutation: Mutations::VerifyEvent
    field :publish_event,             mutation: Mutations::PublishEvent
    field :unpublish_event,           mutation: Mutations::UnpublishEvent
    field :reschedule_event,          mutation: Mutations::RescheduleEvent
  end
end
