# frozen_string_literal: true

# == Schema Information
#
# Table name: event_placements
#
#  id            :bigint           not null, primary key
#  height_places :integer          default(0)
#  places        :jsonb
#  title         :string
#  width_places  :integer          default(0)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  event_id      :bigint
#  firm_id       :bigint
#
# Indexes
#
#  index_event_placements_on_event_id  (event_id)
#  index_event_placements_on_firm_id   (firm_id)
#
require 'rails_helper'

RSpec.describe EventPlacement, type: :model do
  describe 'model setup' do
    it 'constants' do
      # TODO
    end

    it 'relations' do
      should belong_to(:firm)
      should belong_to(:event)
    end

    it 'validations' do
      should validate_presence_of(:title)
    end

    context 'callbacks' do
      it 'firm adjustment' do
        placement = create(:event_placement)

        expect(placement.firm).to eq(placement.event.firm)
      end

      it 'places adjustment' do
        placement = create(:event_placement)

        places_hash = { '0' => [{ 'available' => true, 'coordinates' => [0, 0] }, { 'available' => true, 'coordinates' => [0, 1] }, { 'available' => true, 'coordinates' => [0, 2] }, { 'available' => true, 'coordinates' => [0, 3] }, { 'available' => true, 'coordinates' => [0, 4] }],
                        '1' => [{ 'available' => true, 'coordinates' => [1, 0] }, { 'available' => true, 'coordinates' => [1, 1] }, { 'available' => true, 'coordinates' => [1, 2] }, { 'available' => true, 'coordinates' => [1, 3] }, { 'available' => true, 'coordinates' => [1, 4] }],
                        '2' => [{ 'available' => true, 'coordinates' => [2, 0] }, { 'available' => true, 'coordinates' => [2, 1] }, { 'available' => true, 'coordinates' => [2, 2] }, { 'available' => true, 'coordinates' => [2, 3] }, { 'available' => true, 'coordinates' => [2, 4] }],
                        '3' => [{ 'available' => true, 'coordinates' => [3, 0] }, { 'available' => true, 'coordinates' => [3, 1] }, { 'available' => true, 'coordinates' => [3, 2] }, { 'available' => true, 'coordinates' => [3, 3] }, { 'available' => true, 'coordinates' => [3, 4] }],
                        '4' => [{ 'available' => true, 'coordinates' => [4, 0] }, { 'available' => true, 'coordinates' => [4, 1] }, { 'available' => true, 'coordinates' => [4, 2] }, { 'available' => true, 'coordinates' => [4, 3] }, { 'available' => true, 'coordinates' => [4, 4] }],
                        '5' => [{ 'available' => true, 'coordinates' => [5, 0] }, { 'available' => true, 'coordinates' => [5, 1] }, { 'available' => true, 'coordinates' => [5, 2] }, { 'available' => true, 'coordinates' => [5, 3] }, { 'available' => true, 'coordinates' => [5, 4] }],
                        '6' => [{ 'available' => true, 'coordinates' => [6, 0] }, { 'available' => true, 'coordinates' => [6, 1] }, { 'available' => true, 'coordinates' => [6, 2] }, { 'available' => true, 'coordinates' => [6, 3] }, { 'available' => true, 'coordinates' => [6, 4] }] }

        expect(placement.places).to eq(places_hash)
      end
    end
  end
end
