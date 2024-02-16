# frozen_string_literal: true

# == Schema Information
#
# Table name: attendees
#
#  id                 :bigint           not null, primary key
#  email              :string
#  first_name         :string
#  last_name          :string
#  phone              :string
#  place              :integer          default([]), is an Array
#  status             :string           default("not_registered")
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  booking_id         :bigint
#  event_id           :bigint
#  event_placement_id :bigint
#  firm_id            :bigint
#  schedule_id        :bigint
#
# Indexes
#
#  index_attendees_on_booking_id          (booking_id)
#  index_attendees_on_event_id            (event_id)
#  index_attendees_on_event_placement_id  (event_placement_id)
#  index_attendees_on_firm_id             (firm_id)
#  index_attendees_on_schedule_id         (schedule_id)
#
require 'rails_helper'

RSpec.describe Attendee, type: :model do
  describe 'model setup' do
    it 'relations' do
      should belong_to(:booking)
      should belong_to(:firm)
      should belong_to(:event)
      should belong_to(:schedule)
      should belong_to(:event_placement).optional(true)

      should have_many(:attendee_options).dependent(:destroy)

      should have_many(:event_options).conditions(for_attendee: true)
                                      .through(:event)
                                      .inverse_of(:event)
    end

    context 'callback' do
      let(:event) { create(:recurring_event) }
      let(:booking) { create(:booking, event: event, schedule: event.schedules.last) }
      before do
        create_list(:event_option, 4,
                    event: event,
                    built_in: true,
                    for_attendee: true)
        create_list(:event_option, 4,
                    event: event,
                    built_in: false,
                    for_attendee: true)
        create_list(:event_option, 4,
                    event: event,
                    built_in: false,
                    for_attendee: false)
        create_list(:event_option, 4,
                    event: event,
                    built_in: true,
                    for_attendee: false)
      end

      let(:attendee) { create(:attendee, booking: booking) }

      it 'create_attendee_options' do
        expect(attendee.event.event_options.count).to eq(16)
        expect(attendee.attendee_options.count).to eq(4)
        attendee.attendee_options.each do |opt|
          expect(opt.event_option.built_in).to be_truthy
          expect(opt.event_option.for_attendee).to be_truthy
        end
      end

      it 'attendee_total_price' do
        expect(attendee.event).to eq(booking.event)
        expect(attendee.schedule).to eq(booking.schedule)
        expect(attendee.firm).to eq(booking.firm)
      end
    end

    context 'instance_methods' do
      let(:event) { create(:recurring_event) }
      let(:booking) { create(:booking, event: event, schedule: event.schedules.last) }
      let(:attendee) { create(:attendee, booking: booking, first_name: 'John', last_name: 'Dow') }
      it 'full_name' do
        expect(attendee.full_name).to eq('John Dow')
      end
    end
  end
end
