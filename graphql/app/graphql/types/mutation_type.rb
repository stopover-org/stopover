# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :sign_in,                   mutation: Mutations::Auth::SignIn
    field :sign_out,                  mutation: Mutations::Auth::SignOut

    field :create_event,              mutation: Mutations::EventsMutations::CreateEvent,     require_manager: true
    field :update_event,              mutation: Mutations::EventsMutations::UpdateEvent,     require_manager: true
    field :remove_event,              mutation: Mutations::EventsMutations::RemoveEvent,     require_manager: true
    field :verify_event,              mutation: Mutations::EventsMutations::VerifyEvent,     require_service_user: true
    field :publish_event,             mutation: Mutations::EventsMutations::PublishEvent,    require_manager: true
    field :unpublish_event,           mutation: Mutations::EventsMutations::UnpublishEvent,  require_manager: true
    field :reschedule_event,          mutation: Mutations::EventsMutations::RescheduleEvent, require_service_user: true
    field :sync_stripe,               mutation: Mutations::EventsMutations::SyncStripe,      require_service_user: true
    field :book_event,                mutation: Mutations::EventsMutations::BookEvent
    field :change_event_option_availability,    mutation: Mutations::EventsMutations::ChangeEventOptionAvailability, require_manager: true

    field :create_firm,               mutation: Mutations::FirmsMutations::CreateFirm
    field :update_firm,               mutation: Mutations::FirmsMutations::UpdateFirm
    field :remove_firm,               mutation: Mutations::FirmsMutations::RemoveFirm
    field :verify_firm,               mutation: Mutations::FirmsMutations::VerifyFirm
    field :decline_stripe_connect,    mutation: Mutations::FirmsMutations::DeclineStripeConnect
    field :verify_stripe_connect,     mutation: Mutations::FirmsMutations::VerifyStripeConnect
    field :create_stripe_account,     mutation: Mutations::FirmsMutations::CreateStripeAccount

    field :update_booking,            mutation: Mutations::BookingsMutations::UpdateBooking
    field :cancel_booking,            mutation: Mutations::BookingsMutations::CancelBooking
    field :update_attendee,           mutation: Mutations::BookingsMutations::UpdateAttendee,     require_manager: true
    field :register_attendee,         mutation: Mutations::BookingsMutations::RegisterAttendee,   require_manager: true
    field :remove_attendee,           mutation: Mutations::BookingsMutations::RemoveAttendee,     require_manager: true
    field :deregister_attendee,       mutation: Mutations::BookingsMutations::DeregisterAttendee, require_manager: true
    field :add_attendee,              mutation: Mutations::BookingsMutations::AddAttendee,        require_manager: true
    field :change_attendee_option_availability, mutation: Mutations::BookingsMutations::ChangeAttendeeOptionAvailability,  require_manager: true
    field :change_booking_option_availability,  mutation: Mutations::BookingsMutations::ChangeBookingOptionAvailability,   require_manager: true

    field :create_checkout,           mutation: Mutations::PaymentsMutations::CreateCheckout

    field :cancel_trip,               mutation: Mutations::TripsMutations::CancelTrip
  end
end
