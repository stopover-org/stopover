# frozen_string_literal: true

# == Schema Information
#
# Table name: events
#
#  id                            :bigint           not null, primary key
#  attendee_price_per_uom_cents  :decimal(, )      default(0.0)
#  city                          :string
#  country                       :string
#  description                   :text             not null
#  duration_time                 :string
#  end_date                      :datetime
#  event_type                    :string           not null
#  full_address                  :string
#  house_number                  :string
#  landmark                      :string
#  latitude                      :float
#  longitude                     :float
#  max_attendees                 :integer
#  min_attendees                 :integer          default(0)
#  organizer_price_per_uom_cents :decimal(, )      default(0.0)
#  prepaid_amount_cents          :decimal(, )      default(0.0), not null
#  prepaid_type                  :string
#  recurring_days_with_time      :string           default([]), is an Array
#  ref_number                    :string
#  region                        :string
#  requires_check_in             :boolean          default(FALSE), not null
#  requires_contract             :boolean          default(FALSE), not null
#  requires_passport             :boolean          default(FALSE), not null
#  requires_prepaid              :boolean          default(FALSE), not null
#  single_days_with_time         :datetime         default([]), is an Array
#  status                        :string
#  street                        :string
#  title                         :string           not null
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  firm_id                       :bigint
#  unit_id                       :bigint
#
# Indexes
#
#  index_events_on_event_type              (event_type)
#  index_events_on_firm_id                 (firm_id)
#  index_events_on_ref_number_and_firm_id  (ref_number,firm_id) UNIQUE
#  index_events_on_unit_id                 (unit_id)
#
# Foreign Keys
#
#  fk_rails_...  (firm_id => firms.id)
#  fk_rails_...  (unit_id => units.id)
#
require 'rails_helper'

RSpec.describe Event, type: :model do
  travel_to DateTime.new(2022, 1, 1, 0, 0)
  describe 'active event' do
    context 'with recurrent dates' do
      let!(:event) { create(:recurring_event, recurring_days_with_time: ['Monday 11:30']) }
      it 'should return array of future dates' do
        expect(event.available_dates.length).to eq(4)
        expect(event.available_dates.first).to eq(DateTime.new(2022, 1, 3, 11, 30))
      end
    end
  end

  describe 'cost for attendee' do
    let!(:event) { create(:recurring_event) }
    it '10 percent greater' do
      expect(event.attendee_price_per_uom_cents).to eq(500 * 1.1)
    end
    it 'will be updated' do
      event.update!(organizer_price_per_uom_cents: 1000)
      expect(event.attendee_price_per_uom_cents).to eq(1100)
    end
  end

  describe 'schedule future events' do
    let!(:event) { create(:event) }

    it 'without any dates' do
      expect(event.schedules.count).to eq(0)
      expect(event.recurring_days_with_time.count).to eq(0)
      expect(event.single_days_with_time.count).to eq(0)
    end

    context 'should have recurring schedules' do
      subject { Stopover::EventSupport.schedule(event.reload) }

      before(:each) do
        event.schedules.delete_all
      end

      it 'for the next 4 Mondays' do
        expect(event.schedules.count).to eq(0)

        event.update_columns(recurring_days_with_time: ['Monday 11:30'])
        subject

        expect(event.schedules.count).to eq(4)
        expect(event.schedules.map(&:scheduled_for).map(&:wday)).to all(eq(1))
      end

      it 'for the next 8 Mondays' do
        expect(event.schedules.count).to eq(0)

        event.update_columns(recurring_days_with_time: ['Monday 11:30', 'Monday 18:30'])
        subject

        expect(event.schedules.count).to eq(8)
        expect(event.schedules.map(&:scheduled_for).map(&:wday)).to all(eq(1))

        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 3, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 3, 18, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 10, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 10, 18, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 17, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 17, 18, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 24, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 24, 18, 30, 0, 0)).count).to eq(1)
      end

      it 'for the next 4 Tuesdays' do
        expect(event.schedules.count).to eq(0)

        event.update_columns(recurring_days_with_time: ['Tuesday 11:30'])
        subject

        expect(event.schedules.count).to eq(4)
        expect(event.schedules.map(&:scheduled_for).map(&:wday)).to all(eq(2))

        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 4, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 11, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 18, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 25, 11, 30, 0, 0)).count).to eq(1)
      end

      it 'for the next 4 Mondays and 4 Tuesdays' do
        expect(event.schedules.count).to eq(0)

        event.update_columns(recurring_days_with_time: ['Monday 11:30', 'Tuesday 11:30'])
        subject

        expect(event.schedules.count).to eq(8)
        expect(event.schedules.map(&:scheduled_for).map(&:wday)).to eq([1, 2, 1, 2, 1, 2, 1, 2])

        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 3, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 4, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 10, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 11, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 17, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 18, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 24, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 25, 11, 30, 0, 0)).count).to eq(1)
      end

      it 'for the next single day' do
        expect(event.schedules.count).to eq(0)

        event.update_columns(single_days_with_time: [Time.zone.now.to_datetime.at_beginning_of_day + 4.days + 9.hours])
        subject

        expect(event.schedules.count).to eq(1)
        expect(event.schedules.last.scheduled_for).to eq(4.days.from_now + 9.hours)
      end

      it 'for the next single days' do
        expect(event.schedules.count).to eq(0)

        event.update_columns(single_days_with_time: [
                               Time.zone.now.to_datetime.at_beginning_of_day + 4.days + 9.hours,
                               Time.zone.now.to_datetime.at_beginning_of_day + 4.days + 18.hours
                             ])
        subject

        expect(event.schedules.count).to eq(2)
        expect(event.schedules.order(scheduled_for: :desc).last.scheduled_for).to eq(Time.zone.now.to_datetime.at_beginning_of_day + 4.days + 9.hours)
        expect(event.schedules.order(scheduled_for: :desc).first.scheduled_for).to eq(Time.zone.now.to_datetime.at_beginning_of_day + 4.days + 18.hours)
      end

      it 'for the next single day and few recurring days' do
        expect(event.schedules.count).to eq(0)

        event.update_columns(
          single_days_with_time: [Time.zone.now.to_datetime.at_beginning_of_day + 27.days + 9.hours],
          recurring_days_with_time: ['Monday 11:30', 'Tuesday 11:30']
        )
        subject

        expect(event.schedules.count).to eq(9)
        expect(event.schedules.order(scheduled_for: :asc).map(&:scheduled_for).map(&:wday)).to eq([1, 2, 1, 2, 1, 2, 1, 2, 5])
        expect(event.schedules.where(scheduled_for: Time.zone.now.to_datetime.at_beginning_of_day + 27.days + 9.hours).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 3, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 4, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 10, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 11, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 17, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 18, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 24, 11, 30, 0, 0)).count).to eq(1)
        expect(event.schedules.where(scheduled_for: Time.new(2022, 1, 25, 11, 30, 0, 0)).count).to eq(1)
      end

      context 'with existing schedules' do
        context 'in the future' do
          let!(:schedule) { create(:schedule, event: event, scheduled_for: 1.day.from_now) }

          it 'will be overwritten' do
            expect(event.schedules.count).to eq(1)

            event.update_columns(recurring_days_with_time: ['Monday 11:30'])

            subject { Stopover::EventSupport.schedule(event.reload) }
            expect(event.schedules.count).to eq(4)
          end
        end
        context 'in the past' do
          let!(:schedule) { create(:schedule, event: event, scheduled_for: 1.day.from_now) }

          it 'will be overwritten' do
            expect(event.schedules.count).to eq(1)

            event.update_columns(recurring_days_with_time: ['Monday 11:30'])

            subject { Stopover::EventSupport.schedule(event.reload) }
            expect(event.schedules.count).to eq(4)
          end
        end
      end
    end
  end
end
