# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::AddAttendee, type: :mutation do
  let(:mutation) do
    "
      mutation AddAttendee($input: AddAttendeeInput!) {
        addAttendee(input: $input) {
          booking {
            attendees {
              id
              status
            }
          }

          errors
          notification
        }
      }
    "
  end
  let!(:booking) { create(:booking) }
  let(:current_user) { booking.user }

  let(:input) { { bookingId: GraphqlSchema.id_from_object(booking) } }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do
    it 'successful' do
      result = nil

      expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(1)
      booking.reload

      expect(result.dig(:data, :addAttendee, :booking, :attendees).size).to eq(2)
      expect(result.dig(:data, :addAttendee, :booking, :attendees, 1, :status)).to eq('not_registered')
      expect(result.dig(:data, :addAttendee, :booking, :attendees, 1, :id)).to eq(GraphqlSchema.id_from_object(booking.attendees.last))
      expect(result.dig(:data, :addAttendee, :errors)).to be_nil
      expect(result.dig(:data, :addAttendee, :notification)).to eq('Attendee was added!')
    end
  end

  context 'add attendee' do
    context 'as manager' do
      let(:current_user) { booking.firm.accounts.last.user }

      include_examples :successful
    end

    context 'as booking owner' do
      include_examples :successful
    end

    context 'permissions' do
      context 'for cancelled booking' do
        before { booking.cancel! }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)

          expect(result.dig(:data, :addAttendee, :errors)).to include('Booking cancelled')
          expect(result.dig(:data, :addAttendee, :notification)).to be_nil
        end
      end

      context 'for past booking' do
        before { booking.schedule.update_columns(scheduled_for: 7.days.ago) }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)

          expect(result.dig(:data, :addAttendee, :errors)).to include('Booking past')
          expect(result.dig(:data, :addAttendee, :notification)).to be_nil
        end
      end

      context 'for fully occupied booking' do
        before { booking.event.update_columns(max_attendees: 1) }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)

          expect(result.dig(:data, :addAttendee, :errors)).to include('All places are reserved')
          expect(result.dig(:data, :addAttendee, :notification)).to be_nil
        end
      end

      context 'for different user' do
        let(:current_user) { create(:active_user) }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)

          expect(result.dig(:data, :addAttendee, :errors)).to include('You are not authorized')
          expect(result.dig(:data, :addAttendee, :notification)).to be_nil
        end
      end
    end
  end
end
