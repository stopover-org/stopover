# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::CreateNotification, type: :mutation do
  let(:mutation) do
    "
      mutation CreateNotification($input: CreateNotificationInput!) {
        createNotification(input: $input) {
          booking {
            notifications {
              from
              to
              subject
              content
            }
          }

          errors
          notification
        }
      }
    "
  end
  let!(:booking) { create(:booking) }
  let(:current_user) { booking.firm.accounts.last.user }

  let(:input) { { bookingId: GraphqlSchema.id_from_object(booking), subject: 'Subject', content: 'Content' } }

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do
    it 'send notification to booking owner' do
      expect { subject }.to change { booking.notifications.where(to: booking.account.primary_email).count }.by(1)
    end

    it 'successful' do
      result = nil

      expect { result = subject.to_h.deep_symbolize_keys }.to change { booking.notifications.count }.by(1)
      booking.reload

      expect(result.dig(:data, :createNotification, :booking, :notifications, 0, :subject)).to eq('Subject')
      expect(result.dig(:data, :createNotification, :booking, :notifications, 0, :content)).to_not be_nil
      expect(result.dig(:data, :createNotification, :booking, :notifications, 0, :from)).to eq('no-reply@stopoverx.com')
      expect(result.dig(:data, :createNotification, :booking, :notifications, 0, :to)).to eq(booking.account.primary_email)
    end
  end

  context 'add attendee' do
    context 'as manager' do
      include_examples :successful
    end

    context 'as booking owner' do
      let(:current_user) { booking.user }
      it 'fails' do
        result = nil
        expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.count }.by(0)

        expect(result.dig(:data, :createNotification, :errors)).to include('You are not authorized')
        expect(result.dig(:data, :createNotification, :notification)).to be_nil
      end
    end

    context 'permissions' do
      context 'for cancelled booking' do
        before { booking.cancel! }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.count }.by(0)

          expect(result.dig(:data, :createNotification, :errors)).to include('Booking cancelled')
          expect(result.dig(:data, :createNotification, :notification)).to be_nil
        end
      end

      context 'for past booking' do
        before { booking.schedule.update_columns(scheduled_for: 7.days.ago) }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.count }.by(0)

          expect(result.dig(:data, :createNotification, :errors)).to include('Booking past')
          expect(result.dig(:data, :createNotification, :notification)).to be_nil
        end
      end

      context 'for different user' do
        let(:current_user) { create(:active_user) }
        it 'fails' do
          result = nil
          expect { result = subject.to_h.deep_symbolize_keys }.to change { Notification.count }.by(0)

          expect(result.dig(:data, :createNotification, :errors)).to include('You are not authorized')
          expect(result.dig(:data, :createNotification, :notification)).to be_nil
        end
      end
    end
  end
end
