# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::RemoveAttendee, type: :mutation do
  let(:mutation) do
    "
      mutation RemoveAttendee($input: RemoveAttendeeInput!) {
        removeAttendee(input: $input) {
          attendee {
            id
            status
          }

          errors
          notification
        }
      }
    "
  end
  let!(:attendee) { create(:attendee) }
  let(:current_user) { attendee.booking.firm.accounts.last.user }

  let(:input) do
    { attendeeId: GraphqlSchema.id_from_object(attendee) }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)

      expect(result.dig(:data, :removeAttendee, :attendee, :id)).to eq(GraphqlSchema.id_from_object(attendee))
      expect(result.dig(:data, :removeAttendee, :attendee, :status)).to eq('removed')
      expect(result.dig(:data, :removeAttendee, :notification)).to eq('Attendee removed')
    end
  end

  shared_examples :successful_with_refund do |refund|
    it 'send notification to booking owner' do
      Sidekiq::Testing.inline! do
        expect { subject }.to change { Notification.where(to: attendee.booking.account.primary_email).count }.by(2)
      end
    end

    it 'send notification to booking owner' do
      Sidekiq::Testing.inline! do
        expect { subject }.to change { Notification.where(to: attendee.booking.firm.primary_email).count }.by(1)
      end
    end

    it 'successful with refund' do
      Sidekiq::Testing.inline! do
        booking = attendee.booking
        expect(booking.already_paid_price - booking.attendee_total_price).to eq(Money.new(0))
        expect(booking.event.attendee_price_per_uom).to eq(Money.new(refund))

        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Refund.count }.by(2)

        expect(result.dig(:data, :removeAttendee, :attendee, :id)).to eq(GraphqlSchema.id_from_object(attendee))
        expect(result.dig(:data, :removeAttendee, :attendee, :status)).to eq('removed')
        expect(result.dig(:data, :removeAttendee, :notification)).to eq('Attendee removed')

        expect(booking.refunds.last.refund_amount).to eq(Money.new(refund))
        expect(booking.refunds.last.penalty_amount).to eq(Money.new(0))
      end
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)
      expect(result.dig(:data, :removeAttendee, :attendee)).to be_nil
      expect(result.dig(:data, :removeAttendee, :errors)).to include(error)
    end
  end

  context 'deregister attendee' do
    context 'as manager' do
      context 'for registered attendee' do
        before { attendee.update(status: 'registered') }
        include_examples :successful
      end

      context 'for deregistered attendee' do
        include_examples :successful
      end

      context 'for paid attendee' do
        let!(:payment) do
          create(:payment,
                 total_price: attendee.booking.attendee_total_price,
                 booking: attendee.booking,
                 balance: attendee.booking.event.firm.balance,
                 status: 'successful')
        end
        include_examples :successful_with_refund, 550
      end
    end

    context 'permissions' do
      context 'for removed attendee' do
        before { attendee.update(status: 'removed') }
        include_examples :fail, 'Attendee removed'
      end

      context 'for past booking' do
        before { attendee.booking.schedule.update(scheduled_for: 5.days.ago) }
        include_examples :fail, 'Event past'
      end

      context 'for cancelled booking' do
        before { attendee.booking.update(status: 'cancelled') }
        include_examples :fail, 'Booking cancelled'
      end

      context 'as manager of another company' do
        let!(:current_user) { create(:firm).accounts.last.user }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
