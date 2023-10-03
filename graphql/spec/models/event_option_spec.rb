# frozen_string_literal: true

# == Schema Information
#
# Table name: event_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  built_in              :boolean          default(FALSE)
#  description           :text
#  for_attendee          :boolean          default(FALSE)
#  language              :string           default("en")
#  organizer_price_cents :decimal(, )      default(0.0)
#  status                :string           default("available")
#  title                 :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  event_id              :bigint           not null
#
# Indexes
#
#  index_event_options_on_event_id  (event_id)
#
require 'rails_helper'

RSpec.describe EventOption, type: :model do
  describe 'model setup' do
    subject { create(:event_option) }
    it 'constants' do
      expect(EventOption::GRAPHQL_TYPE).to eq(Types::EventsRelated::EventOptionType)
    end

    it 'relations' do
      should have_many(:booking_options).dependent(:nullify)
      should have_many(:attendee_options).dependent(:nullify)
      should have_many(:stripe_integrations).dependent(:destroy)
      should have_many(:dynamic_translations).dependent(:destroy)

      should have_many(:attendees).through(:attendee_options)
      should have_many(:bookings).through(:booking_options)

      should belong_to(:event)
    end

    it 'validations' do
      should validate_presence_of(:organizer_price_cents)
      should validate_presence_of(:attendee_price_cents)
      should validate_presence_of(:title)
      should validate_presence_of(:language)
      should validate_presence_of(:status)
    end

    it 'monetize' do
      expect(EventOption.monetized_attributes).to eq({  'attendee_price' => 'attendee_price_cents',
                                                        'organizer_price' => 'organizer_price_cents' })
    end

    it 'callbacks' do
      allow(subject).to receive(:adjust_prices)
      allow(subject).to receive(:update_total)
      allow(subject).to receive(:sync_stripe)

      subject
    end
  end
  describe 'cost for attendee' do
    let!(:event_option) { create(:event_option) }
    it 'is right amount' do
      expect(event_option.attendee_price_cents).to eq(440)
    end
    it 'is updated' do
      event_option.update!(organizer_price_cents: 500)
      expect(event_option.attendee_price_cents).to eq(550)
    end
  end
end
