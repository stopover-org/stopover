# frozen_string_literal: true

# == Schema Information
#
# Table name: bookings
#
#  id                            :bigint           not null, primary key
#  attendee_price_per_uom_cents  :decimal(, )      default(0.0)
#  organizer_price_per_uom_cents :decimal(, )      default(0.0)
#  payment_type                  :string
#  status                        :string
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  event_id                      :bigint
#  schedule_id                   :bigint
#  stripe_integration_id         :bigint
#  trip_id                       :bigint
#
# Indexes
#
#  index_bookings_on_event_id               (event_id)
#  index_bookings_on_schedule_id            (schedule_id)
#  index_bookings_on_stripe_integration_id  (stripe_integration_id)
#  index_bookings_on_trip_id                (trip_id)
#
# Foreign Keys
#
#  fk_rails_...  (schedule_id => schedules.id)
#  fk_rails_...  (stripe_integration_id => stripe_integrations.id)
#
require 'rails_helper'

RSpec.describe Booking, type: :model do
  describe 'model setup' do
    subject { create(:booking, event: create(:recurring_event, max_attendees: 100)) }
    it 'constants' do
      expect(Booking::GRAPHQL_TYPE).to eq(Types::BookingsRelated::BookingType)
    end

    it 'relations' do
      should belong_to(:event)
      should belong_to(:trip)
      should belong_to(:schedule)
      should belong_to(:stripe_integration)

      should have_one(:firm).through(:event)
      should have_one(:account).through(:trip)
      should have_one(:user).through(:account)

      should have_many(:booking_options).dependent(:destroy)
      should have_many(:attendees).dependent(:destroy)
      should have_many(:payments).dependent(:nullify)
      should have_many(:refunds).dependent(:nullify)
      should have_many(:attendee_options).dependent(:destroy)
      should have_many(:notifications).dependent(:destroy)

      should have_many(:booking_cancellation_options).through(:event)
      should have_many(:event_options).through(:event)
    end

    it 'enums' do
      should define_enum_for(:payment_type).with_values(cash: 'cash',
                                                        stripe: 'stripe')
                                           .backed_by_column_of_type(:string)
    end
  end

  describe 'booking' do
    let!(:event) { create(:recurring_event, event_options: [create(:built_in_attendee_option), create(:built_in_event_option)]) }
    let!(:booking) { create(:booking, event: event) }

    it 'has one attendee' do
      expect(booking.attendees.count).to eq(1)
    end

    it 'attendee has one attendee option' do
      expect(booking.attendees.first.attendee_options.count).to eq(1)
      expect(booking.booking_options.count).to eq(1)
    end

    it 'check price' do
      expect(booking.booking_options.first.attendee_price).to eq(Money.new(440))
      expect(booking.booking_options.first.organizer_price).to eq(Money.new(400))
      expect(booking.attendees.first.attendee_options.first.attendee_price).to eq(Money.new(440))
      expect(booking.attendees.first.attendee_options.first.organizer_price).to eq(Money.new(400))
    end

    it 'price should be copied create' do
      expect(booking.attendee_price_per_uom).to be(event.attendee_price_per_uom)
      expect(booking.organizer_price_per_uom).to be(event.organizer_price_per_uom)
    end

    it 'price should not be copied on update' do
      event.update!(organizer_price_per_uom: Money.new(100_000))
      expect(booking.attendee_price_per_uom).not_to be(event.attendee_price_per_uom)
      expect(booking.organizer_price_per_uom).not_to be(event.organizer_price_per_uom)
    end

    it 'check price on update' do
      booking.event_options.find_each { |event_option| event_option.update!(organizer_price_cents: 500) }

      booking_option = booking.booking_options.first
      attendee_option = booking.attendee_options.first
      expect(booking_option.reload.attendee_price).to eq(Money.new(550))
      expect(booking_option.organizer_price).to eq(Money.new(500))

      expect(attendee_option.reload.attendee_price).to eq(Money.new(550))
      expect(attendee_option.organizer_price).to eq(Money.new(500))
    end
  end
  context 'methods' do
    let!(:event) { create(:recurring_event) }
    let!(:booking) { create(:booking, event: event) }
    let!(:booking_option) { create(:booking_option, booking: booking) }

    it 'sum of prices' do
      booking.reload

      expect(booking.attendee_total_price).to eq(Money.new(990))
      expect(booking.organizer_total_price).to eq(Money.new(900))
    end
  end
end
