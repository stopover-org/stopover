# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :decline_stripe_connect, mutation: Mutations::FirmsRelated::DeclineStripeConnect
    field :verify_stripe_connect, mutation: Mutations::FirmsRelated::VerifyStripeConnect
    field :change_attendee_option_availability, mutation: Mutations::BookingsRelated::ChangeAttendeeOptionAvailability
    field :change_booking_option_availability, mutation: Mutations::BookingsRelated::ChangeBookingOptionAvailability
    field :create_event, mutation: Mutations::EventsRelated::CreateEvent
    field :update_event, mutation: Mutations::EventsRelated::UpdateEvent
    field :remove_event, mutation: Mutations::EventsRelated::RemoveEvent
    field :verify_event, mutation: Mutations::EventsRelated::VerifyEvent
    field :publish_event, mutation: Mutations::EventsRelated::PublishEvent
    field :unpublish_event, mutation: Mutations::EventsRelated::UnpublishEvent
    field :reschedule_event, mutation: Mutations::EventsRelated::RescheduleEvent
    field :sync_stripe, mutation: Mutations::EventsRelated::SyncStripe
    field :change_event_option_availability, mutation: Mutations::EventsRelated::ChangeEventOptionAvailability

    field :create_firm, mutation: Mutations::FirmsRelated::CreateFirm
    field :set_current_firm, mutation: Mutations::FirmsRelated::SetCurrentFirm
    field :update_firm, mutation: Mutations::FirmsRelated::UpdateFirm
    field :remove_firm, mutation: Mutations::FirmsRelated::RemoveFirm
    field :verify_firm, mutation: Mutations::FirmsRelated::VerifyFirm

    field :sign_in, mutation: Mutations::AuthRelated::SignIn
    field :sign_out, mutation: Mutations::AuthRelated::SignOut
    field :update_account, mutation: Mutations::AuthRelated::UpdateAccount

    field :cancel_trip, mutation: Mutations::TripsRelated::CancelTrip

    field :book_event, mutation: Mutations::BookingsRelated::BookEvent
    field :update_booking, mutation: Mutations::BookingsRelated::UpdateBooking
    field :cancel_booking, mutation: Mutations::BookingsRelated::CancelBooking

    field :update_attendee, mutation: Mutations::BookingsRelated::UpdateAttendee
    field :register_attendee, mutation: Mutations::BookingsRelated::RegisterAttendee
    field :remove_attendee, mutation: Mutations::BookingsRelated::RemoveAttendee
    field :deregister_attendee, mutation: Mutations::BookingsRelated::DeregisterAttendee
    field :add_attendee, mutation: Mutations::BookingsRelated::AddAttendee

    field :create_checkout, mutation: Mutations::PaymentsRelated::CreateCheckout
    field :create_stripe_account, mutation: Mutations::FirmsRelated::CreateStripeAccount
    field :withdraw_balance, mutation: Mutations::PaymentsRelated::WithdrawBalance
  end
end
