# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TripsQuery, type: :query do
  let(:current_user) { create(:active_user, with_account: true) }
  let!(:booking) do
    create(:booking, trip: create(:trip,
                                  start_date: 'Fri, 12 Jan 2024 12:19:00.000000000 UTC +00:00',
                                    end_date: 'Fri, 13 Jan 2024 12:19:00.000000000 UTC +00:00',
                                    account: current_user.account))
  end
  before do
    create(:trip,
           start_date: 'Fri, 14 Jan 2024 12:19:00.000000000 UTC +00:00',
           end_date: 'Fri, 15 Jan 2024 12:19:00.000000000 UTC +00:00',
           account: current_user.account)
    create(:trip,
           start_date: 'Fri, 16 Jan 2024 12:19:00.000000000 UTC +00:00',
           end_date: 'Fri, 17 Jan 2024 12:19:00.000000000 UTC +00:00',
           account: current_user.account)
    create(:trip,
           start_date: 'Fri, 18 Jan 2024 12:19:00.000000000 UTC +00:00',
           end_date: 'Fri, 19 Jan 2024 12:19:00.000000000 UTC +00:00',
           account: current_user.account)
  end

  describe 'initiate' do
    let(:query) { TripsQuery.new({}, current_user) }
    subject { query.all }

    it 'all trips' do
      expect(subject.count).to eq(4)
    end
  end

  describe 'search by date' do
    let(:query) do
      TripsQuery.new({ start_date: 'Fri, 16 Jan 2024 12:19:00.000000000 UTC +00:00' },
                     current_user)
    end
    subject { query.all }

    it 'trips with date' do
      expect(subject.count).to eq(1)
    end
  end
end
