# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateCheckout do
  describe 'mutation create checkout' do
    let!(:mutation) do
      "
        mutation CreateCheckout($input: CreateCheckoutInput!){
          createCheckout(input: $input) {
            url
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

    it 'create checkout session in stripe.' do
      ::Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'true')
      expect(Stripe::Checkout::Session).to receive(:create)
        .with({
                line_items: [{
                  price: 'price_id_full_amount',
                                quantity: 1
                }],
                                            mode: 'payment',
                                            success_url: 'http://localhost:3000/checkouts/success',
                                            cancel_url: 'http://localhost:3000/checkouts/success'
              })
        .and_return({ url: 'my_url' })
      res = subject.to_h
      expect(res['data']['createCheckout']).to eq({
                                                    'url' => 'my_url',
                               'booking' => { 'id' => GraphqlSchema.id_from_object(booking) }
                                                  })
    end
    context 'checkout session was not created.' do
      let!(:event) { create(:recurring_event) }
      let!(:booking) { create(:booking, schedule: event.schedules.first, event: event) }

      it 'booking was given, but without event options' do
        ::Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'true')
        expect(Stripe::Checkout::Session).to receive(:create)
        #                                        .with({
        #                                                line_items: [{
        #                                                               price: nil,
        #                                                               quantity: 1
        #                                                             }],
        #                                                mode: 'payment',
        #                                                success_url: 'http://localhost:3000/checkouts/success',
        #                                                cancel_url: 'http://localhost:3000/checkouts/success'
        #                                              })
        res = subject.to_h

        expect(res['data']['createCheckout']).to eq({
                                                      'booking' => nil,
                                                      'url' => nil
                                                    })
        expect(res['errors']).to be_nil
      end
    end
  end
end