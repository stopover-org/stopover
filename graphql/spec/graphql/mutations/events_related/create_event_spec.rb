# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::EventsRelated::CreateEvent, type: :mutation do
  let(:mutation) do
    "
      mutation CreateEvent($input: CreateEventInput!) {
        createEvent(input: $input) {
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
  let(:firm) { create(:firm) }
  let(:current_user) { firm.accounts.last.user }

  let(:input) do
    {
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
    it 'send notification to firm owner' do
      expect { subject }.to change { Notification.where(to: current_user.account.firm.primary_email).count }.by(1)
    end

    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(1)

      expected.except(:organizerPricePerUom, :attendeePricePerUom, :depositAmount, :eventOptions, :bookingCancellationOptions).each do |key, value|
        expect(result.dig(:data, :createEvent, :event, key)).to eq(value)
      end

      expect(result.dig(:data, :createEvent, :notification)).to eq('Event created')
    end

    it 'check event options' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(1)

      if input[:eventOptions].size.positive?
        result.dig(:data, :createEvent, :event, :eventOptions).each_with_index do |opt, _idx|
          expected_event_option = expected[:eventOptions].find { |expected_opt| expected_opt[:title] == opt[:title] }

          expected_event_option.except(:organizerPrice, :attendeePrice).each do |key, value|
            expect(opt[key]).to eq(value)
          end

          expect(opt.dig(:organizerPrice, :cents)).to eq(expected_event_option[:organizerPrice])
          expect(opt.dig(:organizerPrice, :currency, :name)).to eq('usd')

          expect(opt.dig(:attendeePrice, :cents)).to eq(expected_event_option[:attendeePrice])
          expect(opt.dig(:attendeePrice, :currency, :name)).to eq('usd')
        end
      end
    end

    it 'create event' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(1)

      if input[:bookingCancellationOptions].size.positive?
        result.dig(:data, :createEvent, :event, :bookingCancellationOptions).each_with_index do |_opt, idx|
          expected[:bookingCancellationOptions][idx].except(:penaltyPrice).each do |key, value|
            expect(result.dig(:data, :createEvent, :event, :bookingCancellationOptions, idx, key)).to eq(value)
          end

          expect(result.dig(:data, :createEvent, :event, :bookingCancellationOptions, idx, :penaltyPrice, :cents)).to eq(expected[:bookingCancellationOptions][idx][:penaltyPrice])
          expect(result.dig(:data, :createEvent, :event, :bookingCancellationOptions, idx, :penaltyPrice, :currency, :name)).to eq('usd')
        end
      end
    end

    it 'check prices' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Event.count }.by(1)

      expect(result.dig(:data, :createEvent, :event, :organizerPricePerUom, :cents)).to eq(expected[:organizerPricePerUom])
      expect(result.dig(:data, :createEvent, :event, :organizerPricePerUom, :currency, :name)).to eq('usd')

      expect(result.dig(:data, :createEvent, :event, :attendeePricePerUom, :cents)).to eq(expected[:attendeePricePerUom])
      expect(result.dig(:data, :createEvent, :event, :attendeePricePerUom, :currency, :name)).to eq('usd')

      expect(result.dig(:data, :createEvent, :event, :depositAmount, :cents)).to eq(expected[:depositAmount])
      expect(result.dig(:data, :createEvent, :event, :depositAmount, :currency, :name)).to eq('usd')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Booking.count }.by(0)

      expect(result.dig(:data, :createEvent, :eventOption)).to be_nil
      expect(result.dig(:data, :createEvent, :errors)).to include(error)
    end
  end

  context 'create event' do
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
          dates = [7.days.ago + 20.hours, 14.days.ago + 20.hours]
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
        before { firm.update(status: 'removed') }
        include_examples :fail, 'You are not authorized'
      end

      context 'as common user' do
        let(:current_user) { create(:active_user) }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
