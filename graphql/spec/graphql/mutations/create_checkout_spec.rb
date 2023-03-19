# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateCheckout do
  describe 'mutation create checkout' do
    let!(:mutation) do
      "
        mutation CreateCheckout($input: CreateCheckoutInput!){
          createCheckout(input: $input) {
            url
            payment {
              id
            }
            booking {
              id
            }
          }
        }
      "
    end

    let!(:event) { create(:stripe_integration_factory) }
    let!(:booking) { create(:booking, schedule: event.schedules.first, event: event) }

    subject do
      GraphqlSchema.execute(mutation, variables: {
                              input: {
                                bookingId: GraphqlSchema.id_from_object(booking),
                                paymentType: 'full_amount'
                              }
                            })
    end

    it 'create checkout session in stripe correctly' do
      ::Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'true')
      expect(Stripe::Checkout::Session).to receive(:create)
        .and_return({ url: 'my_url', id: 'checkout_id' })

      expect { subject }.to change { Payment.count }.by(1)
      res = subject.to_h

      expect(Payment.last.status).to eq('processing')
      expect(Payment.last.stripe_checkout_session_id).to eq('checkout_id')
      expect(res['data']['createCheckout']).to eq({
                                                    'url' => 'my_url',
                                                    'booking' => { 'id' => GraphqlSchema.id_from_object(booking) },
                                                    'payment' => { 'id' => GraphqlSchema.id_from_object(Payment.last) }
                                                  })
    end

    context 'checkout session was not created.' do
      let!(:event) { create(:stripe_integration_factory) }
      let!(:payment) { create(:payment) }
      let!(:booking) { create(:booking, schedule: event.schedules.first, event: event, payments: [payment]) }

      it 'booking was given, but without event options' do
        ::Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'true')
        expect(Stripe::Checkout::Session).to receive(:create).and_raise(StandardError)

        expect { subject }.to change { Payment.count }.by(1)
        res = subject.to_h

        expect(Payment.last.status).to eq('pending')
        expect(res['data']['createCheckout']).to eq({
                                                      'url' => nil,
                                                      'booking' => { 'id' => GraphqlSchema.id_from_object(booking) },
                                                      'payment' => { 'id' => GraphqlSchema.id_from_object(Payment.last) }
                                                    })
      end
    end

    context 'payment in process' do
      let!(:event) { create(:stripe_integration_factory) }
      let!(:payment) { create(:payment_in_process) }
      let!(:booking) { create(:booking, schedule: event.schedules.first, event: event, payments: [payment]) }

      it 'raise error' do
        ::Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'true')
        res = subject.to_h
        expect(res['data']['createCheckout']).to eq({
                                                      'booking' => { 'id' => GraphqlSchema.id_from_object(booking) },
                                                      'payment' => nil,
                                                      'url' => nil
                                                    })
      end
    end
  end
end
