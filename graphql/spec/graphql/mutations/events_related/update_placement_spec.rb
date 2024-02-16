# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::EventsRelated::UpdatePlacement, type: :mutation do
  let(:event) { create(:published_event) }
  let(:placement) { create(:event_placement, event: event, width_places: 6, height_places: 7) }
  let(:current_user) { event.firm.accounts.last.user }
  let(:mutation) do
    <<-GRAPHQL
      mutation UpdatePlacement($input: UpdatePlacementInput!) {
        updatePlacement(input: $input) {
          eventPlacement {
            id
            widthPlaces
            heightPlaces
            title
            places {
              available
              coordinates
            }
          }
          errors
          notification
        }
      }
    GRAPHQL
  end
  let(:input) do
    {
      placementId: GraphqlSchema.id_from_object(placement),
      title: 'Placement Title Upd',
      widthPlaces: 5,
      heightPlaces: 6
    }
  end
  let(:expected) do
    {
      id: GraphqlSchema.id_from_object(placement.reload),
      title: 'Placement Title Upd',
      widthPlaces: 5,
      heightPlaces: 6,
      places: [{ available: true, coordinates: [0, 0] },
               { available: true, coordinates: [0, 1] },
               { available: true, coordinates: [0, 2] },
               { available: true, coordinates: [0, 3] },
               { available: true, coordinates: [0, 4] },
               { available: true, coordinates: [0, 5] },
               { available: true, coordinates: [1, 0] },
               { available: true, coordinates: [1, 1] },
               { available: true, coordinates: [1, 2] },
               { available: true, coordinates: [1, 3] },
               { available: true, coordinates: [1, 4] },
               { available: true, coordinates: [1, 5] },
               { available: true, coordinates: [2, 0] },
               { available: true, coordinates: [2, 1] },
               { available: true, coordinates: [2, 2] },
               { available: true, coordinates: [2, 3] },
               { available: true, coordinates: [2, 4] },
               { available: true, coordinates: [2, 5] },
               { available: true, coordinates: [3, 0] },
               { available: true, coordinates: [3, 1] },
               { available: true, coordinates: [3, 2] },
               { available: true, coordinates: [3, 3] },
               { available: true, coordinates: [3, 4] },
               { available: true, coordinates: [3, 5] },
               { available: true, coordinates: [4, 0] },
               { available: true, coordinates: [4, 1] },
               { available: true, coordinates: [4, 2] },
               { available: true, coordinates: [4, 3] },
               { available: true, coordinates: [4, 4] },
               { available: true, coordinates: [4, 5] }]

    }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :fail do |error|
    it 'fails' do
      placement
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { EventPlacement.count }.by(0)

      expect(result.dig(:data, :updatePlacement, :eventPlacement)).to be_nil
      expect(result.dig(:data, :updatePlacement, :errors)).to include(error)
    end
  end

  shared_examples :successful do
    it 'successful' do
      placement
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { EventPlacement.count }.by(0)

      expected.each do |key, value|
        expect(result.dig(:data, :updatePlacement, :eventPlacement, key)).to eq(value)
      end

      expect(result.dig(:data, :updatePlacement, :notification)).to eq("You've updated event displacement")
    end
  end

  context 'create placement' do
    context 'as manager' do
      include_examples :successful
    end

    context 'as common user' do
      let(:current_user) { create(:active_user) }
      include_examples :fail, 'You are not authorized'
    end

    context 'as manager of different firm' do
      let(:current_user) { create(:published_event).firm.accounts.last.user }
      include_examples :fail, 'You are not authorized'
    end
  end
end
