# frozen_string_literal: true

# == Schema Information
#
# Table name: tour_plans
#
#  id          :bigint           not null, primary key
#  description :text
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  event_id    :bigint
#  firm_id     :bigint
#
# Indexes
#
#  index_tour_plans_on_event_id  (event_id)
#  index_tour_plans_on_firm_id   (firm_id)
#
require 'rails_helper'

RSpec.describe TourPlan, type: :model do
  describe 'model setup' do
    it 'constants' do
      expect(TourPlan::GRAPHQL_TYPE).to eq(Types::TripsRelated::TourPlanType)
    end

    it 'relations' do
      should belong_to(:firm)
      should belong_to(:event)

      should have_many(:tour_places).dependent(:destroy)
      should have_many(:dynamic_translations).dependent(:destroy)
    end
    context 'validations' do
      it 'check' do
        should validate_presence_of(:title)
      end
    end
    context 'callbacks' do
      context 'assign references' do
        let(:tour_plan) { create(:tour_plan, event: create(:event), firm: nil) }
        it 'success' do
          expect(tour_plan.firm).to eq(tour_plan.event.firm)
        end
      end
    end
  end
end
