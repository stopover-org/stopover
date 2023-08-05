# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :decline_stripe_connect, mutation: Mutations::DeclineStripeConnect
    field :verify_stripe_connect, mutation: Mutations::VerifyStripeConnect
    field :change_attendee_option_availability, mutation: Mutations::ChangeAttendeeOptionAvailability,  require_manager: true
    field :change_booking_option_availability,  mutation: Mutations::ChangeBookingOptionAvailability,   require_manager: true
    field :change_event_option_availability,    mutation: Mutations::ChangeEventOptionAvailability,     require_manager: true

    field :create_event,              mutation: Mutations::EventsMutations::CreateEvent,     require_manager: true
    field :update_event,              mutation: Mutations::EventsMutations::UpdateEvent,     require_manager: true
    field :remove_event,              mutation: Mutations::EventsMutations::RemoveEvent,     require_manager: true
    field :verify_event,              mutation: Mutations::EventsMutations::VerifyEvent,     require_service_user: true
    field :publish_event,             mutation: Mutations::EventsMutations::PublishEvent,    require_manager: true
    field :unpublish_event,           mutation: Mutations::EventsMutations::UnpublishEvent,  require_manager: true
    field :reschedule_event,          mutation: Mutations::EventsMutations::RescheduleEvent, require_service_user: true
    field :sync_stripe,               mutation: Mutations::EventsMutations::SyncStripe,      require_service_user: true
    field :book_event,                mutation: Mutations::EventsMutations::BookEvent

    field :create_firm,               mutation: Mutations::CreateFirm
    field :update_firm,               mutation: Mutations::UpdateFirm
    field :remove_firm,               mutation: Mutations::RemoveFirm
    field :verify_firm,               mutation: Mutations::VerifyFirm

    field :sign_in,                   mutation: Mutations::SignIn
    field :sign_out,                  mutation: Mutations::SignOut

    field :set_up_account,            mutation: Mutations::SetUpAccount

    field :cancel_trip,               mutation: Mutations::CancelTrip

    field :update_booking,            mutation: Mutations::UpdateBooking
    field :cancel_booking,            mutation: Mutations::CancelBooking

    field :update_attendee,           mutation: Mutations::UpdateAttendee,    require_manager: true
    field :register_attendee,         mutation: Mutations::RegisterAttendee,  require_manager: true
    field :remove_attendee,           mutation: Mutations::RemoveAttendee,    require_manager: true
    field :deregister_attendee,       mutation: Mutations::DeregisterAttendee, require_manager: true
    field :add_attendee,              mutation: Mutations::AddAttendee, require_manager: true

    field :create_checkout,           mutation: Mutations::CreateCheckout
    field :create_stripe_account,     mutation: Mutations::CreateStripeAccount
  end
end
