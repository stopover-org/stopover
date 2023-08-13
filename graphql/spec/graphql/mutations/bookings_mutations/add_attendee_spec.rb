# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsMutations::AddAttendee do
  let(:default_time) { Time.zone.now.at_beginning_of_hour }
  let(:mutation) do
    "
      mutation AddAttendee($input: AddAttendeeInput!) {
        addAttendee(input: $input) {
          booking {
            status
            event {
              minAttendees
              maxAttendees
            }
            attendees {
              id
            }
          }
          notification
          errors
          redirectUrl
        }
      }
    "
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :success do |status: 'active'|
    it 'success' do
      result = nil

      expect(booking.attendees.count).to eq(1)

      Timecop.freeze(default_time) do
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(1)
                                                            .and change { Notification.firm_attendee_added.delivery_method_email.count }.by(1)
                                                            .and change { Notification.trip_attendee_added.delivery_method_email.count }.by(1)
        expect(result.dig(:data, :addAttendee, :booking, :attendees).count).to eq(2)
        expect(result.dig(:data, :addAttendee, :booking, :status)).to eq(status)
        expect(result.dig(:data, :addAttendee, :errors)).to be_nil
        expect(result.dig(:data, :addAttendee, :redirectUrl)).to be_nil
        expect(result.dig(:data, :addAttendee, :notification)).to eq('Attendee added')
      end
    end
  end

  shared_examples :fail do |errors:|
    it 'fail' do
      result = nil

      expect(booking.attendees.count).to eq(1)

      Timecop.freeze(default_time) do
        expect do
          result = subject.to_h.deep_symbolize_keys
        end.to change { Attendee.count }.by(0)
                                        .and change { Notification.firm_attendee_added.delivery_method_email.count }.by(0)
                                        .and change { Notification.trip_attendee_added.delivery_method_email.count }.by(0)

        expect(result.dig(:data, :addAttendee, :errors)).to eq(errors)
      end
    end
  end

  describe 'add attendee to existing booking' do
    let(:event) { create(:recurring_event) }
    context 'without min/max limitations' do
      let(:booking) { create(:future_booking, event: event) }
      let(:current_user) { booking.firm.accounts.first.user }
      let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }
      include_examples :success
    end

    context 'for past booking' do
      let(:booking) { create(:past_booking) }
      let(:current_user) { booking.firm.accounts.first.user }
      let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }
      include_examples :fail, errors: ['Event past']
    end

    context 'for cancelled booking' do
      let(:booking) { create(:cancelled_booking) }
      let(:current_user) { booking.firm.accounts.first.user }
      let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }
      include_examples :fail, errors: ['Booking was cancelled']
    end

    context 'for paid booking' do
      let(:booking) { create(:paid_booking, event: event) }
      let(:current_user) { booking.firm.accounts.first.user }
      let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }
      include_examples :success
    end

    context 'for free event' do
      let(:event) { create(:recurring_event, organizer_price_per_uom_cents: 0) }
      let(:booking) { create(:paid_booking, event: event) }
      let(:current_user) { booking.firm.accounts.first.user }
      let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }
      include_examples :success, status: 'paid'
    end

    context 'with min/max limitations' do
      let(:event) { create(:limited_event, max_attendees: 3) }
      let(:booking) { create(:future_booking, event: event) }
      let(:booking2) { create(:booking, event: event, schedule: booking.schedule) }
      let(:booking3) { create(:booking, event: event, schedule: booking.schedule) }
      let(:current_user) { booking.firm.accounts.first.user }
      let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }
      it 'without reaching maximum' do
        result = nil

        expect(booking.event.min_attendees).to eq(0)
        expect(booking.event.max_attendees).to eq(3)
        expect(booking.attendees.count).to eq(1)

        Timecop.freeze(default_time) do
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(1)
                                                              .and change { Notification.firm_attendee_added.delivery_method_email.count }.by(1)
                                                              .and change { Notification.trip_attendee_added.delivery_method_email.count }.by(1)
          expect(result.dig(:data, :addAttendee, :booking, :attendees).count).to eq(2)
          expect(result.dig(:data, :addAttendee, :errors)).to be_nil
          expect(result.dig(:data, :addAttendee, :redirectUrl)).to be_nil
          expect(result.dig(:data, :addAttendee, :notification)).to eq('Attendee added')
        end
      end
      it 'with exactly max attendees reaching' do
        result = nil

        expect(booking.event.min_attendees).to eq(0)
        expect(booking.event.max_attendees).to eq(3)
        expect(booking.attendees.count).to eq(1)
        expect(booking2.attendees.count).to eq(1)

        Timecop.freeze(default_time) do
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(1)
                                                              .and change { Notification.firm_attendee_added.delivery_method_email.count }.by(1)
                                                              .and change { Notification.trip_attendee_added.delivery_method_email.count }.by(1)
          expect(result.dig(:data, :addAttendee, :booking, :attendees).count).to eq(2)
          expect(result.dig(:data, :addAttendee, :errors)).to be_nil
          expect(result.dig(:data, :addAttendee, :redirectUrl)).to be_nil
          expect(result.dig(:data, :addAttendee, :notification)).to eq('Attendee added')
        end
      end
      it 'with more than maximum attendee reaching' do
        result = nil

        expect(booking.event.min_attendees).to eq(0)
        expect(booking.event.max_attendees).to eq(3)
        expect(booking.attendees.count).to eq(1)
        expect(booking2.attendees.count).to eq(1)
        expect(booking3.attendees.count).to eq(1)

        Timecop.freeze(default_time) do
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)
                                                              .and change { Notification.firm_attendee_added.delivery_method_email.count }.by(0)
                                                              .and change { Notification.trip_attendee_added.delivery_method_email.count }.by(0)
          expect(result.dig(:data, :addAttendee, :booking)).to be_nil
          expect(result.dig(:data, :addAttendee, :errors)).to eq(['All places are occupied'])
        end
      end
    end

    describe 'permissions' do
      let(:booking) { create(:future_booking, event: event) }
      let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }

      context 'as guest' do
        let(:current_user) { create(:temporary_user) }
        include_examples :fail, errors: ['You don\'t have permissions']
      end

      context 'as common user' do
        let(:current_user) { create(:active_user) }
        include_examples :fail, errors: ['You don\'t have permissions']
      end

      context 'as manager' do
        let(:current_user) { booking.event.firm.accounts.last.user }
        include_examples :success
      end

      context 'as trip owner' do
        let(:current_user) { booking.trip.account.user }
        include_examples :success
      end

      context 'as manager of another firm' do
        let(:firm) { create(:firm) }
        let(:current_user) { firm.accounts.last.user }
        include_examples :fail, errors: ['You don\'t have permissions']
      end
    end
  end
end
