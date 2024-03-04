# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::EventsRelated::InterestType, type: :graphql_type do
  let(:variables) { {} }
  let(:current_user) { create(:active_user, with_account: true) }
  subject do
    GraphqlSchema.execute(query,
                          variables: variables,
                          context: { current_user: current_user }).to_h.deep_symbolize_keys
  end

  context 'available fields' do
    let(:query) do
      <<-GRAPHQL
        query {
          __type(name:"Interest") {
            fields {
              name
            }
          }
        }
      GRAPHQL
    end

    it 'success' do
      result = subject
      expect(result.dig(:data, :__type, :fields)).to eq([
                                                          {
                                                            name: 'id'
                                                          },
                                                          {
                                                            name: 'originalTitle'
                                                          },
                                                          {
                                                            name: 'preview'
                                                          },
                                                          {
                                                            name: 'slug'
                                                          },
                                                          {
                                                            name: 'title'
                                                          }
                                                        ])
    end
  end

  context 'translate' do
    let!(:interest) { create(:interest, title: 'Source Title') }
    let(:query) do
      <<-GRAPHQL
        query {
          interests {
            nodes {
              title
              originalTitle
            }
          }
        }
      GRAPHQL
    end

    it 'title and source title' do
      expect_any_instance_of(Interest).to receive(:translate).with(:title)
                                                             .and_return('Translated Title')
      result = subject

      expect(result.dig(:data, :interests, :nodes, 0, :title)).to eq('Translated Title')
      expect(result.dig(:data, :interests, :nodes, 0, :originalTitle)).to eq('Source Title')
    end
  end
end
