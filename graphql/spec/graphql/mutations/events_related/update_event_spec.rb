# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::EventsRelated::UpdateEvent, type: :mutation do
  let(:mutation) do
    "
      mutation UpdateEvent($input: UpdateEventInput!) {
        updateEvent(input: $input) {
          event {
            id
            status

            title
            eventType
            description
            recurringDaysWithTime
            singleDaysWithTime
            durationTime
            endDate

            houseNumber
            street
            city
            country
            region
            fullAddress

            schedules {
              nodes {
                id
              }
            }

            eventOptions {
              id
              title
              description
              builtIn
              forAttendee
              status
              organizerPrice {
                cents
                currency {
                  name
                }
              }
              attendeePrice {
                cents
                currency {
                  name
                }
              }
            }

            bookingCancellationOptions {
              penaltyPrice {
                cents
                currency {
                  name
                }
              }
              deadline
              description
              status
            }

            requiresContract
            requiresPassport
            requiresCheckIn
            requiresDeposit
            maxAttendees
            minAttendees
            organizerPricePerUom {
              cents
              currency {
                name
              }
            }
            attendeePricePerUom {
              cents
              currency {
                name
              }
            }
            depositAmount {
              cents
              currency {
                name
              }
            }
          }

          errors
          notification
        }
      }
    "
  end
  let!(:event) { create(:event) }
  let(:current_user) { event.firm.accounts.last.user }

  let(:input) do
    {
      eventId: GraphqlSchema.id_from_object(event),

      title: 'Event #1',
      eventType: 'excursion',
      description: 'Description',
      recurringDates: [],
      singleDates: [],
      durationTime: '2h 30m',
      endDate: nil,

      houseNumber: '10',
      street: 'Makedonska 21',
      city: 'Beograd',
      country: 'Serbia',
      region: nil,
      fullAddress: 'Impact Hub Beograd',

      eventOptions: [],
      bookingCancellationOptions: [],

      requiresContract: true,
      requiresPassport: true,
      requiresCheckIn: true,
      requiresDeposit: true,
      maxAttendees: nil,
      minAttendees: nil,
      organizerPricePerUomCents: 1000,
      depositAmountCents: 100,
      images: []
    }
  end

  let(:expected) do
    {
      id: GraphqlSchema.id_from_object(event),

      title: 'Event #1',
      eventType: 'excursion',
      description: 'Description',

      durationTime: '2h 30m',
      endDate: nil,

      houseNumber: '10',
      street: 'Makedonska 21',
      city: 'Beograd',
      country: 'Serbia',
      region: nil,
      fullAddress: 'Impact Hub Beograd',

      requiresContract: true,
      requiresPassport: true,
      requiresCheckIn: true,
      requiresDeposit: true,
      maxAttendees: nil,
      minAttendee: nil,

      depositAmount: 100,
      organizerPricePerUom: 1000,
      attendeePricePerUom: 1100,

      eventOptions: []
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
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expected.except(:organizerPricePerUom, :attendeePricePerUom, :depositAmount, :eventOptions, :bookingCancellationOptions).each do |key, value|
        expect(result.dig(:data, :updateEvent, :event, key)).to eq(value)
      end

      expect(result.dig(:data, :updateEvent, :notification)).to eq('Event updated')
    end

    it 'check event options' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      if input[:eventOptions].size.positive?
        result.dig(:data, :updateEvent, :event, :eventOptions).each_with_index do |_opt, idx|
          expected[:eventOptions][idx].except(:organizerPrice, :attendeePrice).each do |key, value|
            expect(result.dig(:data, :updateEvent, :event, :eventOptions, idx, key)).to eq(value)
          end

          expect(result.dig(:data, :updateEvent, :event, :eventOptions, idx, :organizerPrice, :cents)).to eq(expected[:eventOptions][idx][:organizerPrice])
          expect(result.dig(:data, :updateEvent, :event, :eventOptions, idx, :organizerPrice, :currency, :name)).to eq('usd')

          expect(result.dig(:data, :updateEvent, :event, :eventOptions, idx, :attendeePrice, :cents)).to eq(expected[:eventOptions][idx][:attendeePrice])
          expect(result.dig(:data, :updateEvent, :event, :eventOptions, idx, :attendeePrice, :currency, :name)).to eq('usd')
        end
      end
    end

    it 'create event' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      if input[:bookingCancellationOptions].size.positive?
        result.dig(:data, :updateEvent, :event, :bookingCancellationOptions).each_with_index do |_opt, idx|
          expected[:bookingCancellationOptions][idx].except(:penaltyPrice).each do |key, value|
            expect(result.dig(:data, :updateEvent, :event, :bookingCancellationOptions, idx, key)).to eq(value)
          end

          expect(result.dig(:data, :updateEvent, :event, :bookingCancellationOptions, idx, :penaltyPrice, :cents)).to eq(expected[:bookingCancellationOptions][idx][:penaltyPrice])
          expect(result.dig(:data, :updateEvent, :event, :bookingCancellationOptions, idx, :penaltyPrice, :currency, :name)).to eq('usd')
        end
      end
    end

    it 'check prices' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(0)

      expect(result.dig(:data, :updateEvent, :event, :organizerPricePerUom, :cents)).to eq(expected[:organizerPricePerUom])
      expect(result.dig(:data, :updateEvent, :event, :organizerPricePerUom, :currency, :name)).to eq('usd')

      expect(result.dig(:data, :updateEvent, :event, :attendeePricePerUom, :cents)).to eq(expected[:attendeePricePerUom])
      expect(result.dig(:data, :updateEvent, :event, :attendeePricePerUom, :currency, :name)).to eq('usd')

      expect(result.dig(:data, :updateEvent, :event, :depositAmount, :cents)).to eq(expected[:depositAmount])
      expect(result.dig(:data, :updateEvent, :event, :depositAmount, :currency, :name)).to eq('usd')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Booking.count }.by(0)

      expect(result.dig(:data, :updateEvent, :eventOption)).to be_nil
      expect(result.dig(:data, :updateEvent, :errors)).to include(error)
    end
  end

  context 'update event' do
    context 'as manager' do
      context 'with deposit' do
        include_examples :successful
      end

      context 'without deposit' do
        before do
          input[:requiresDeposit] = false
          expected[:depositAmount] = 0
          expected[:requiresDeposit] = false
        end
        include_examples :successful
      end

      context 'with event options' do
        before do
          input[:eventOptions] = [{
            title: 'Evt Opt #1',
            organizerPriceCents: 100,
            builtIn: true
          }, {
            title: 'Evt Opt #2',
            organizerPriceCents: 100,
            builtIn: true,
            forAttendee: true
          }]

          expected[:eventOptions] = [{
            title: 'Evt Opt #1',
            attendeePrice: 110,
            organizerPrice: 100,
            builtIn: true
          }, {
            title: 'Evt Opt #2',
            attendeePrice: 110,
            organizerPrice: 100,
            builtIn: true,
            forAttendee: true
          }]
        end
        include_examples :successful
      end

      context 'with cancellation options' do
        before do
          input[:bookingCancellationOptions] = [{
            penaltyPriceCents: 10,
            deadline: 24,
            description: 'description'
          }, {
            penaltyPriceCents: 20,
            deadline: 48,
            description: 'description'
          }]

          expected[:bookingCancellationOptions] = [{
            penaltyPrice: 20,
              deadline: 48,
              description: 'description'
          }, {
            penaltyPrice: 10,
            deadline: 24,
            description: 'description'
          }]
        end
        include_examples :successful
      end

      context 'with single dates' do
        before do
          dates = [7.days.from_now + 20.hours, 14.days.from_now + 20.hours]
          input[:singleDates] = dates.map { |dt| "#{dt.day.to_s.rjust(2, '0')}/#{dt.month.to_s.rjust(2, '0')}/#{dt.year.to_s.rjust(2, '0')} #{dt.hour.to_s.rjust(2, '0')}:#{dt.min.to_s.rjust(2, '0')}" }

          expected[:singleDaysWithTime] = dates.map { |dt| dt.change(sec: 0) }.map(&:iso8601)
        end
        include_examples :successful
      end

      context 'with recurring dates' do
        before do
          dates = ['sunday 14:30', 'monday 15:34']
          input[:recurringDates] = dates

          expected[:recurringDaysWithTime] = dates
        end
        include_examples :successful
      end
    end

    context 'permissions' do
      context 'for removed firm' do
        before { event.firm.update(status: 'removed') }
        include_examples :fail, 'You are not authorized'
      end

      context 'as common user' do
        let(:current_user) { create(:active_user) }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
