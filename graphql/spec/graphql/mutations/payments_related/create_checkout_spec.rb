# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::PaymentsRelated::CreateCheckout, type: :mutation do
  let(:mutation) do
    "
      mutation CreateCheckout($input: CreateCheckoutInput!) {
        createCheckout(input: $input) {
          url

          errors
          notification
        }
      }
    "
  end
  let!(:booking) { create(:booking) }
  let(:current_user) { booking.user }

  let(:input) do
    {
      bookingId: GraphqlSchema.id_from_object(booking),
      paymentType: 'full_amount'
    }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do
    it 'successful' do
      result = nil
      expect(Stripe::Checkout::Session).to receive(:create)
        .and_return({ url: 'my_url', id: 'checkout_id' })
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Payment.count }.by(1)

      expect(booking.reload.payment_type).to eq(input[:paymentType] == 'full_amount' ? 'stripe' : 'cash')
      expect(result.dig(:data, :createCheckout, :url)).to be('my_url')
      expect(result.dig(:data, :createCheckout, :notification)).to eq('You will be redirected to checkout page')
    end
  end

  shared_examples :successful_with_existing_payment do |status|
    it 'successful' do
      expect(Stripe::Checkout::Session).to receive(:retrieve)
        .and_return({ status: status })

      result = nil

      if status == 'expired'
        expect(Stripe::Checkout::Session).to receive(:create)
          .and_return({ url: 'my_url', id: 'checkout_id' })
      end

      expect { result = subject.to_h.deep_symbolize_keys }.to change { Payment.count }.by(status == 'complete' ? 0 : 1)

      expect(result.dig(:data, :createCheckout, :url)).to be(status == 'complete' ? nil : 'my_url')
      expect(result.dig(:data, :createCheckout, :notification)).to eq(status == 'complete' ? nil : 'You will be redirected to checkout page')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Payment.count }.by(0)

      expect(result.dig(:data, :createCheckout, :url)).to be_nil
      expect(result.dig(:data, :createCheckout, :errors)).to include(error)
    end
  end

  context 'create checkout url' do
    before do
      booking.firm.update(payment_types: ['stripe'])
    end
    context 'as common user' do
      context 'for full amount' do
        context 'without existing payment' do
          include_examples :successful
        end
        context 'with existing payment' do
          let!(:payment) do
            create(:payment,
                   booking: booking,
                   total_price: booking.attendee_total_price,
                   balance: booking.firm.balance,
                   stripe_checkout_session_id: 'stripe_checkout_session_id',
                   status: 'processing')
          end
          context 'for completed payment' do
            include_examples :successful_with_existing_payment, 'complete'
          end

          context 'for expired url' do
            include_examples :successful_with_existing_payment, 'expired'
          end
        end
      end
      context 'for deposit' do
        before { input[:paymentType] = 'deposit' }
        context 'without existing payment' do
          include_examples :successful
        end
        context 'with existing payment' do
          let!(:payment) do
            create(:payment,
                   booking: booking,
                   total_price: booking.attendee_total_price,
                   balance: booking.firm.balance,
                   stripe_checkout_session_id: 'stripe_checkout_session_id',
                   status: 'processing')
          end
          context 'for completed payment' do
            include_examples :successful_with_existing_payment, 'complete'
          end

          context 'for expired url' do
            include_examples :successful_with_existing_payment, 'expired'
          end
        end
      end
    end

    context 'permissions' do
      context 'for cancelled booking' do
        before { booking.update(status: 'cancelled') }
        include_examples :fail, 'Booking cancelled'
      end

      context 'for removed event' do
        before { booking.event.update(status: 'removed') }
        include_examples :fail, 'Event removed'
      end

      context 'for removed firm' do
        before { booking.firm.update(status: 'removed') }
        include_examples :fail, 'Firm was not verified'
      end

      context 'as common user' do
        let(:current_user) { create(:active_user) }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
