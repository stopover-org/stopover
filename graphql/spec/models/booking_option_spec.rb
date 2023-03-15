# frozen_string_literal: true

# == Schema Information
#
# Table name: attendee_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  organizer_price_cents :decimal(, )      default(0.0)
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  attendee_id           :bigint
#  event_option_id       :bigint
#
# Indexes
#
#  index_attendee_options_on_attendee_id      (attendee_id)
#  index_attendee_options_on_event_option_id  (event_option_id)
#
require 'rails_helper'

RSpec.describe BookingOption, type: :model do
  describe 'booking option' do
    let!(:booking_option) { create(:booking_option) }
    let!(:payment) { create(:payment, booking: booking_option.booking) }

    it 'attendee price and organizer price is not changing because of payment status' do
      expect(payment.pending?).to eq(true)
      payment.process!
      expect(booking_option.attendee_price.cents).to eq(440)
      expect(booking_option.organizer_price.cents).to eq(400)
      booking_option.adjust_prices!
      expect(booking_option.attendee_price.cents).to eq(440)
      expect(booking_option.organizer_price.cents).to eq(400)

      payment.success!
      expect(booking_option.attendee_price.cents).to eq(440)
      expect(booking_option.organizer_price.cents).to eq(400)
      booking_option.adjust_prices!
      expect(booking_option.attendee_price.cents).to eq(440)
      expect(booking_option.organizer_price.cents).to eq(400)
    end

    context 'attendee price and organizer price' do
      let!(:booking_option) { create(:booking_option) }
      let!(:payment) { create(:payment, booking: booking_option.booking) }

      it 'are changing' do
        expect(payment.pending?).to eq(true)
        booking_option.event_option.update(organizer_price: Money.new(5))
        expect(booking_option.attendee_price.cents).to eq(440)
        expect(booking_option.organizer_price.cents).to eq(400)
        booking_option.adjust_prices!
        expect(booking_option.attendee_price.cents).to eq(6)
        expect(booking_option.organizer_price.cents).to eq(5)
      end
    end
  end
end
