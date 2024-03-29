# frozen_string_literal: true

# == Schema Information
#
# Table name: tour_places
#
#  id            :bigint           not null, primary key
#  description   :text
#  duration_time :string
#  title         :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  event_id      :bigint
#  firm_id       :bigint
#  tour_plan_id  :bigint
#
# Indexes
#
#  index_tour_places_on_event_id      (event_id)
#  index_tour_places_on_firm_id       (firm_id)
#  index_tour_places_on_tour_plan_id  (tour_plan_id)
#
require 'rails_helper'

RSpec.describe TourPlace, type: :model do
  describe 'model setup' do
    it 'constants' do
      expect(TourPlace::GRAPHQL_TYPE).to eq(Types::TripsRelated::TourPlaceType)
    end

    it 'relations' do
      should belong_to(:firm)
      should belong_to(:event)
      should belong_to(:tour_plan)
      should have_many(:dynamic_translations).dependent(:destroy)
    end
    context 'validations' do
      it 'check' do
        should validate_presence_of(:title)
      end
    end
    context 'callbacks' do
      context 'assign references' do
        let(:tour_place) { create(:tour_place, tour_plan: create(:tour_plan), firm: nil) }
        it 'success' do
          expect(tour_place.firm).to eq(tour_place.tour_plan.firm)
          expect(tour_place.event).to eq(tour_place.tour_plan.event)
        end
      end
    end
  end
end
