# frozen_string_literal: true

# == Schema Information
#
# Table name: booking_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  organizer_price_cents :decimal(, )      default(0.0)
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  booking_id            :bigint
#  event_option_id       :bigint
#
# Indexes
#
#  index_booking_options_on_booking_id       (booking_id)
#  index_booking_options_on_event_option_id  (event_option_id)
#
# Foreign Keys
#
#  fk_rails_...  (booking_id => bookings.id)
#  fk_rails_...  (event_option_id => event_options.id)
#
FactoryBot.define do
  factory :booking_option do
    booking { create(:booking) }
    event_option { create(:event_option) }
  end
end
