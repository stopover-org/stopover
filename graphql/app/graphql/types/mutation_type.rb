# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :decline_stripe_connect, mutation: Mutations::FirmsRelated::DeclineStripeConnect, require_service_user: true
    field :verify_stripe_connect,  mutation: Mutations::FirmsRelated::VerifyStripeConnect,  require_service_user: true
    field :change_attendee_option_availability, mutation: Mutations::BookingsRelated::ChangeAttendeeOptionAvailability,  require_manager: true
    field :change_booking_option_availability,  mutation: Mutations::BookingsRelated::ChangeBookingOptionAvailability,   require_manager: true
    field :create_event,              mutation: Mutations::EventsRelated::CreateEvent,    require_manager: true
    field :update_event,              mutation: Mutations::EventsRelated::UpdateEvent,    require_manager: true
    field :remove_event,              mutation: Mutations::EventsRelated::RemoveEvent,    require_manager: true
    field :verify_event,              mutation: Mutations::EventsRelated::VerifyEvent,    require_service_user: true
    field :publish_event,             mutation: Mutations::EventsRelated::PublishEvent,    require_manager: true
    field :unpublish_event,           mutation: Mutations::EventsRelated::UnpublishEvent,  require_manager: true
    field :reschedule_event,          mutation: Mutations::EventsRelated::RescheduleEvent, require_service_user: true
    field :sync_stripe,               mutation: Mutations::EventsRelated::SyncStripe,      require_service_user: true
    field :change_event_option_availability, mutation: Mutations::EventsRelated::ChangeEventOptionAvailability, require_manager: true

    field :create_firm,               mutation: Mutations::FirmsRelated::CreateFirm
    field :set_current_firm,          mutation: Mutations::FirmsRelated::SetCurrentFirm,  require_service_user: true
    field :update_firm,               mutation: Mutations::FirmsRelated::UpdateFirm,      require_manager: true
    field :remove_firm,               mutation: Mutations::FirmsRelated::RemoveFirm,      require_manager: true
    field :verify_firm,               mutation: Mutations::FirmsRelated::VerifyFirm,      require_service_user: true

    field :sign_in,                   mutation: Mutations::AuthRelated::SignIn
    field :sign_out,                  mutation: Mutations::AuthRelated::SignOut
    field :update_account,            mutation: Mutations::AuthRelated::UpdateAccount

    field :cancel_trip,               mutation: Mutations::TripsRelated::CancelTrip

    field :book_event,                mutation: Mutations::BookingsRelated::BookEvent
    field :update_booking,            mutation: Mutations::BookingsRelated::UpdateBooking
    field :cancel_booking,            mutation: Mutations::BookingsRelated::CancelBooking

    field :update_attendee,           mutation: Mutations::BookingsRelated::UpdateAttendee,     require_manager: true
    field :register_attendee,         mutation: Mutations::BookingsRelated::RegisterAttendee,   require_manager: true
    field :remove_attendee,           mutation: Mutations::BookingsRelated::RemoveAttendee,     require_manager: true
    field :deregister_attendee,       mutation: Mutations::BookingsRelated::DeregisterAttendee, require_manager: true
    field :add_attendee,              mutation: Mutations::BookingsRelated::AddAttendee,        require_manager: true

    field :create_checkout,           mutation: Mutations::PaymentsRelated::CreateCheckout
    field :create_stripe_account,     mutation: Mutations::FirmsRelated::CreateStripeAccount, require_manager: true
    field :withdraw_balance,          mutation: Mutations::PaymentsRelated::WithdrawBalance,  require_manager: true
  end
end
