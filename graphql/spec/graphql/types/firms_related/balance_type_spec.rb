# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::FirmsRelated::BalanceType, type: :graphql_type do
  let(:variables) { {} }
  let(:current_user) { create(:active_user, with_account: true) }
  subject do
    GraphqlSchema.execute(query,
                          variables: variables,
                          context: { current_user: current_user }).to_h.deep_symbolize_keys
  end

  context 'available fields' do
    let(:query) do
      <<-GRAPHQL
        query {
          __type(name:"Balance") {
            fields {
              name
            }
          }
        }
      GRAPHQL
    end

    it 'success' do
      result = subject
      expect(result.dig(:data, :__type, :fields)).to eq([
                                                          {
                                                            name: 'firm'
                                                          },
                                                          {
                                                            name: 'id'
                                                          },
                                                          {
                                                            name: 'processingPayments'
                                                          },
                                                          {
                                                            name: 'successfulPayments'
                                                          },
                                                          {
                                                            name: 'totalAmount'
                                                          }
                                                        ])
    end

    context 'payments' do
      let(:event) { create(:recurring_event, status: :published) }
      let(:firm) { event.firm }
      let(:current_user) { firm.accounts.last.user }
      let(:parent_refund) { create(:refund, firm: firm) }
      let(:query) do
        <<-GRAPHQL
          query {
            currentUser {
              account {
                firm {
                  balance {
                    totalAmount {
                      cents
                    }
                    successfulPayments {
                      cents
                    }
                    processingPayments {
                      cents
                    }
                  }
                }
              }
            }
          }
        GRAPHQL
      end
      before do
        create_list(:booking, 40, schedule: event.schedules.last, event: event)
        create(:refund, firm: event.firm)

        create_list(:payment, 20, firm: firm, booking: event.bookings.sample)
        create_list(:payment, 20, status: :processing, firm: firm, booking: event.bookings.sample)
        create_list(:payment, 20, status: :canceled, firm: firm, booking: event.bookings.sample)
        create_list(:payment, 20, status: :successful, firm: firm, booking: event.bookings.sample)

        create_list(:refund, 10, firm: firm, booking: event.bookings.sample, parent_refund: parent_refund)
        create_list(:refund, 10, status: :processing, firm: firm, booking: event.bookings.sample, parent_refund: parent_refund)
        create_list(:refund, 10, status: :canceled, firm: firm, booking: event.bookings.sample, parent_refund: parent_refund)
        create_list(:refund, 10, status: :successful, firm: firm, booking: event.bookings.sample, parent_refund: parent_refund)

        create_list(:payout, 10, firm: firm)
        create_list(:payout, 10, status: :processing, firm: firm)
        create_list(:payout, 10, status: :canceled, firm: firm)
        create_list(:payout, 10, status: :successful, firm: firm)

        Refund.all.each(&:top_up_balance)
        Payment.all.each(&:top_up_balance)
        Payout.all.each(&:top_up_balance)
      end

      it 'total amount include only successful payments, successful payouts and successful refunds' do
        result = subject

        expect(result.dig(:data, :currentUser, :account, :firm, :balance, :totalAmount, :cents)).to eq(2000)
        expect(result.dig(:data, :currentUser, :account, :firm, :balance, :successfulPayments, :cents)).to eq(4000)
        expect(result.dig(:data, :currentUser, :account, :firm, :balance, :processingPayments, :cents)).to eq(4000)
      end
    end
  end
end
