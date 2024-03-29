# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::ChangeAttendeeOptionAvailability, type: :mutation do
  let(:mutation) do
    "
      mutation ChangeAttendeeOptionAvailability($input: ChangeAttendeeOptionAvailabilityInput!) {
        changeAttendeeOptionAvailability(input: $input) {
          attendeeOption {
            id
            status
          }

          errors
          notification
        }
      }
    "
  end
  let(:event) { create(:recurring_event) }
  let(:booking) { create(:booking, event: event) }
  let!(:attendee_option) { create(:attendee_option, event_option: create(:for_attendee_event_option, event: event), event: event, booking: booking) }
  let(:current_user) { attendee_option.firm.accounts.last.user }

  let(:input) do
    { attendeeOptionId: GraphqlSchema.id_from_object(attendee_option) }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do |status, message|
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { AttendeeOption.count }.by(0)

      expect(result.dig(:data, :changeAttendeeOptionAvailability, :attendeeOption, :id)).to eq(GraphqlSchema.id_from_object(attendee_option))
      expect(result.dig(:data, :changeAttendeeOptionAvailability, :attendeeOption, :status)).to eq(status)
      expect(result.dig(:data, :changeAttendeeOptionAvailability, :notification)).to eq(message)
    end
  end

  shared_examples :successful_with_refund do |refund|
    it 'send notification to booking owner' do
      Sidekiq::Testing.inline! do
        expect { subject }.to change { Notification.where(to: attendee_option.booking.account.primary_email).count }.by(1)
      end
    end

    it 'successful with refund' do
      Sidekiq::Testing.inline! do
        booking = attendee_option.booking
        expect(booking.already_paid_price - booking.attendee_total_price).to eq(Money.new(0))
        expect(attendee_option.attendee_price).to eq(Money.new(refund))

        expect { subject.to_h.deep_symbolize_keys }.to change { Refund.count }.by(2)

        expect(booking.refunds.last.refund_amount).to eq(Money.new(refund))
        expect(booking.refunds.last.penalty_amount).to eq(Money.new(0))
      end
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { AttendeeOption.count }.by(0)
      expect(result.dig(:data, :changeAttendeeOptionAvailability, :attendeeOption)).to be_nil
      expect(result.dig(:data, :changeAttendeeOptionAvailability, :errors)).to include(error)
    end
  end

  context 'add attendee' do
    context 'unavailable to available' do
      context 'as manager' do
        before { attendee_option.update(status: 'not_available') }
        include_examples :successful, 'available', 'Attendee Option is available from now'
      end
    end

    context 'available to unavailable' do
      context 'as manager' do
        before { attendee_option.update(status: 'available') }
        include_examples :successful, 'not_available', 'Attendee Option is unavailable from now'

        context 'for paid option' do
          let!(:payment) do
            create(:payment,
                   total_price: attendee_option.booking.attendee_total_price,
                   booking: attendee_option.booking,
                   balance: attendee_option.firm.balance,
                   status: 'successful')
          end
          include_examples :successful_with_refund, 440
        end
      end
    end

    context 'permissions' do
      context 'for past booking' do
        before { attendee_option.schedule.update(scheduled_for: 5.days.ago) }
        include_examples :fail, 'Booking past'
      end

      context 'for cancelled booking' do
        before { attendee_option.booking.update(status: 'cancelled') }
        include_examples :fail, 'Booking cancelled'
      end

      context 'as booking attendee company' do
        let(:current_user) { attendee_option.booking.user }
        include_examples :fail, 'You are not authorized'
      end

      context 'as manager of another company' do
        let!(:current_user) { create(:firm).accounts.last.user }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
