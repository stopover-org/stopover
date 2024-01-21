# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TripsQuery, type: :query do
  before do
    create(:trip,
           start_date: 'Fri, 12 Jan 2024 12:19:00.000000000 UTC +00:00',
           end_date: 'Fri, 13 Jan 2024 12:19:00.000000000 UTC +00:00')
    create(:trip,
           start_date: 'Fri, 14 Jan 2024 12:19:00.000000000 UTC +00:00',
           end_date: 'Fri, 15 Jan 2024 12:19:00.000000000 UTC +00:00')
    create(:trip,
           start_date: 'Fri, 16 Jan 2024 12:19:00.000000000 UTC +00:00',
           end_date: 'Fri, 17 Jan 2024 12:19:00.000000000 UTC +00:00')
    create(:trip,
           start_date: 'Fri, 18 Jan 2024 12:19:00.000000000 UTC +00:00',
           end_date: 'Fri, 19 Jan 2024 12:19:00.000000000 UTC +00:00')
  end
  let!(:booking) { create(:booking, trip: Trip.last) }

  describe 'initiate' do
    let(:query) { TripsQuery.new }
    subject { query.all }

    it 'all trips' do
      expect(subject.count).to eq(4)
    end
  end

  describe 'search by date' do
    let(:query) { TripsQuery.new(start_date: 'Fri, 16 Jan 2024 12:19:00.000000000 UTC +00:00') }
    subject { query.all }

    it 'trips with date' do
      expect(subject.count).to eq(1)
    end
  end
end
