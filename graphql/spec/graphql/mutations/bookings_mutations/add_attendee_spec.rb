# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsMutations::AddAttendee do
  let(:default_time) { Time.zone.now.at_beginning_of_hour }
  let(:mutation) do
    "
      mutation AddAttendee($input: AddAttendeeInput!) {
        addAttendee(input: $input) {
          booking {
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

  let(:temporary_user) { create(:temporary_user) }
  let(:customer) { create(:active_user) }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  describe 'add attendee to existing booking' do
    let(:event) { create(:recurring_event) }
    context 'without min/max limitations' do
      let(:booking) { create(:future_booking, event: event) }
      let(:current_user) { booking.firm.accounts.first.user }
      let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }
      it 'success' do
        result = nil

        expect(booking.event.min_attendees).to eq(0)
        expect(booking.event.max_attendees).to be_nil

        Timecop.freeze(default_time) do
          debugger
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(1)
                                                              .and change { Notification.firm_attendee_added.delivery_method_email.count }.by(1)
                                                              .and change { Notification.trip_attendee_added.delivery_method_email.count }.by(1)
          expect(result.dig(:data, :addAttendee, :booking, :attendees).count).to eq(2)
          expect(result.dig(:data, :addAttendee, :errors)).to be_nil
          expect(result.dig(:data, :addAttendee, :redirectUrl)).to be_nil
          expect(result.dig(:data, :addAttendee, :notification)).to eq('Attendee added')
        end
      end
      context 'fail' do
        let(:booking) { create(:past_booking) }
        let(:current_user) { booking.firm.accounts.first.user }
        let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }
        it 'for past booking' do
          result = nil

          Timecop.freeze(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)
                                                                .and change { Notification.firm_attendee_added.delivery_method_email.count }.by(0)
                                                                .and change { Notification.trip_attendee_added.delivery_method_email.count }.by(0)

            expect(result.dig(:data, :addAttendee, :errors)).to eq(['Event past'])
          end
        end
      end
    end
    context 'with min/max limitations' do
      it 'without reaching maximum' do
        Timecop.freeze(default_time) do
        end
      end
      it 'with exactly max attendees reaching' do
        Timecop.freeze(default_time) do
        end
      end
      it 'with more than maximum attendee reaching' do
        Timecop.freeze(default_time) do
        end
      end
    end
    context 'permissions' do
      it 'as guest' do
        Timecop.freeze(default_time) do
        end
      end
      it 'as common user' do
        Timecop.freeze(default_time) do
        end
      end
      it 'as manager' do
        Timecop.freeze(default_time) do
        end
      end
      it 'as service_user' do
        Timecop.freeze(default_time) do
        end
      end
      it 'as manager of another firm' do
        Timecop.freeze(default_time) do
        end
      end
    end
  end
end
